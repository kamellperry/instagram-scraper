import { useState, useEffect } from 'react';
import { Scripts as RemixScripts } from 'react-router';

export default function Scripts({ nonce }: { nonce?: string; }) {
  // This is a workaround to ensure the script runs after the component is hydrated
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsHydrated(true);
    }, 0);
  }, []);

  return (
    <>
      {/* {isHydrated && <script></script>} */}
      {/* <script></script> */}
      <ExampleScript />
      <RemixScripts nonce={nonce} />
    </>
  );
}

function ExampleScript() {
  useEffect(() => {
    // Load script
    // const script = document.createElement('script');
    // script.src = 'https://example.com/script.js';
    // document.head.appendChild(script);
  }, []);

  return null;
}
