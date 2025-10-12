import React, { useEffect, useRef } from 'react';

export default function SimpleAd({ client, slot, style, className }) {
  const ref = useRef(null);

  useEffect(() => {
    // Attempt to render the ad if the AdSense script is present
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (_) {
      // ignore in dev/test environments
    }
  }, [client, slot]);

  if (!client || !slot) return null;

  const baseStyle = {
    display: 'block',
    ...style,
  };

  return (
    <ins
      ref={ref}
      className={`adsbygoogle ${className || ''}`.trim()}
      style={baseStyle}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

