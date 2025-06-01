import io

from flask import Flask, jsonify, make_response, request, send_file
from flask_cors import CORS
from reportlab.pdfgen import canvas

app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True,
)


import logging

logging.basicConfig(level=logging.INFO)


@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.json
    try:
        gross = max(0, float(data.get("grossPay", 0)))
        freq = data.get("payFrequency", "biweekly")
        filing_status = data.get("filingStatus", "single").lower()
        dependents = max(0, int(data.get("dependents", 0)))
        deductions = max(0, float(data.get("deductions", 0)))
        extra = max(0, float(data.get("extraWithholding", 0)))
        multiple_jobs = data.get("multipleJobs", False)
        other_income = max(0, float(data.get("otherIncome", 0)))
        pretax_deductions = max(0, float(data.get("pretaxDeductions", 0)))
        exempt = data.get("exempt", False)
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid input values"}), 400

    if exempt:
        return jsonify(
            {
                "withholdingPerPaycheck": 0.00,
                "annualWithholding": 0.00,
                "note": "You are marked as exempt from withholding.",
            }
        )

    # Pay periods
    freq_map = {"weekly": 52, "biweekly": 26, "semimonthly": 24, "monthly": 12}
    periods = freq_map.get(freq, 26)

    # Adjusted income
    annual_income = gross * periods + other_income - pretax_deductions

    # Standard deductions (2024 approx)
    standard_deductions = {"single": 14600, "married": 29200, "head": 21900}
    std_deduction = standard_deductions.get(filing_status, 14600)

    # Simplified 2024 tax brackets
    tax_brackets = {
        "single": [
            (0, 0.10),
            (11600, 0.12),
            (47150, 0.22),
            (100525, 0.24),
            (191950, 0.32),
            (243725, 0.35),
            (609350, 0.37),
        ],
        "married": [
            (0, 0.10),
            (23200, 0.12),
            (94300, 0.22),
            (201050, 0.24),
            (383900, 0.32),
            (487450, 0.35),
            (731200, 0.37),
        ],
        "head": [
            (0, 0.10),
            (16550, 0.12),
            (63100, 0.22),
            (100500, 0.24),
            (191950, 0.32),
            (243700, 0.35),
            (609350, 0.37),
        ],
    }

    brackets = tax_brackets.get(filing_status, tax_brackets["single"])

    # Taxable income
    taxable_income = max(0, annual_income - std_deduction - deductions)

    # Tax calculation
    def calc_tax(income, brackets):
        tax = 0
        for i in range(len(brackets)):
            if i + 1 < len(brackets) and income > brackets[i + 1][0]:
                tax += (brackets[i + 1][0] - brackets[i][0]) * brackets[i][1]
            else:
                tax += (income - brackets[i][0]) * brackets[i][1]
                break
        return tax

    total_tax = calc_tax(taxable_income, brackets)

    # Dependent credit
    total_tax = max(0, total_tax - (dependents * 2000))

    # Multiple jobs adjustment
    if multiple_jobs:
        total_tax *= 1.05

    withholding_per = (total_tax / periods) + extra

    # Debug log
    app.logger.info(
        {
            "filing_status": filing_status,
            "gross": gross,
            "other_income": other_income,
            "pretax": pretax_deductions,
            "deductions": deductions,
            "dependents": dependents,
            "exempt": exempt,
            "taxable_income": taxable_income,
            "final_tax": total_tax,
            "withholding_per_check": withholding_per,
        }
    )

    return jsonify(
        {
            "withholdingPerPaycheck": round(withholding_per, 2),
            "annualWithholding": round(total_tax, 2),
        }
    )


@app.route("/generate-w4", methods=["POST", "OPTIONS"])
def generate_w4():
    if request.method == "OPTIONS":
        # Manual preflight response
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return response

    data = request.json
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer)
    p.setFont("Helvetica", 12)

    # Draw title
    p.drawString(100, 780, "W-4 Form (Simplified Preview)")
    y = 760

    # Write form fields
    for field, value in data.items():
        p.drawString(100, y, f"{field}: {value}")
        y -= 20

    # Tax logic
    try:
        gross = max(0, float(data.get("grossPay", 0)))
        freq = data.get("payFrequency", "biweekly")
        filing_status = data.get("filingStatus", "single").lower()
        dependents = max(0, int(data.get("dependents", 0)))
        deductions = max(0, float(data.get("deductions", 0)))
        extra = max(0, float(data.get("extraWithholding", 0)))
        multiple_jobs = data.get("multipleJobs", False)
        other_income = max(0, float(data.get("otherIncome", 0)))
        pretax_deductions = max(0, float(data.get("pretaxDeductions", 0)))
        exempt = data.get("exempt", False)

        freq_map = {"weekly": 52, "biweekly": 26, "semimonthly": 24, "monthly": 12}
        periods = freq_map.get(freq, 26)
        annual_income = gross * periods + other_income - pretax_deductions

        std_deductions = {"single": 14600, "married": 29200, "head": 21900}
        std_deduction = std_deductions.get(filing_status, 14600)

        tax_brackets = {
            "single": [
                (0, 0.10),
                (11600, 0.12),
                (47150, 0.22),
                (100525, 0.24),
                (191950, 0.32),
                (243725, 0.35),
                (609350, 0.37),
            ],
            "married": [
                (0, 0.10),
                (23200, 0.12),
                (94300, 0.22),
                (201050, 0.24),
                (383900, 0.32),
                (487450, 0.35),
                (731200, 0.37),
            ],
            "head": [
                (0, 0.10),
                (16550, 0.12),
                (63100, 0.22),
                (100500, 0.24),
                (191950, 0.32),
                (243700, 0.35),
                (609350, 0.37),
            ],
        }
        brackets = tax_brackets.get(filing_status, tax_brackets["single"])

        def calc_tax(income, brackets):
            tax = 0
            for i in range(len(brackets)):
                if i + 1 < len(brackets) and income > brackets[i + 1][0]:
                    tax += (brackets[i + 1][0] - brackets[i][0]) * brackets[i][1]
                else:
                    tax += (income - brackets[i][0]) * brackets[i][1]
                    break
            return tax

        if exempt:
            withholding_per = 0.0
            annual_withholding = 0.0
        else:
            taxable_income = max(0, annual_income - std_deduction - deductions)
            total_tax = calc_tax(taxable_income, brackets)
            total_tax = max(0, total_tax - (dependents * 2000))
            if multiple_jobs:
                total_tax *= 1.05
            withholding_per = (total_tax / periods) + extra
            annual_withholding = total_tax

        # Add preview to PDF
        y -= 30
        p.setFont("Helvetica-Bold", 12)
        p.drawString(100, y, "Estimated Withholding Preview")
        y -= 20
        p.setFont("Helvetica", 12)
        p.drawString(100, y, f"Withholding per paycheck: ${withholding_per:.2f}")
        y -= 20
        p.drawString(100, y, f"Annual withholding: ${annual_withholding:.2f}")

    except Exception as e:
        y -= 30
        p.setFont("Helvetica-Bold", 12)
        p.drawString(100, y, "Error generating preview")
        y -= 20
        p.setFont("Helvetica", 10)
        p.drawString(100, y, f"{str(e)}")

    p.save()
    buffer.seek(0)
    response = send_file(
        buffer,
        as_attachment=True,
        download_name="w4_form.pdf",
        mimetype="application/pdf",
    )
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    return response


if __name__ == "__main__":
    app.run(debug=True, port=5001)
