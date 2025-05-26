"use client"

import { useState } from "react"

export default function ResponsiveDebug() {
  const [isVisible, setIsVisible] = useState(false)

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-0 right-0 z-[9999] p-2">
      <button onClick={() => setIsVisible(!isVisible)} className="bg-black/70 text-white p-2 rounded-md text-xs">
        {isVisible ? "Hide" : "Show"} Debug
      </button>

      {isVisible && (
        <div className="bg-black/70 text-white p-2 mt-2 rounded-md text-xs">
          <div>
            <span className="inline xs:hidden">xs: &lt;320px</span>
            <span className="hidden xs:inline sm:hidden">xs: ≥320px</span>
            <span className="hidden sm:inline md:hidden">sm: ≥640px</span>
            <span className="hidden md:inline lg:hidden">md: ≥768px</span>
            <span className="hidden lg:inline xl:hidden">lg: ≥1024px</span>
            <span className="hidden xl:inline 2xl:hidden">xl: ≥1280px</span>
            <span className="hidden 2xl:inline">2xl: ≥1536px</span>
          </div>
          <div className="mt-1">
            Width: <span id="screen-width"></span>px
          </div>
          <div className="mt-1">
            Height: <span id="screen-height"></span>px
          </div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                function updateDimensions() {
                  document.getElementById('screen-width').textContent = window.innerWidth;
                  document.getElementById('screen-height').textContent = window.innerHeight;
                }
                updateDimensions();
                window.addEventListener('resize', updateDimensions);
              `,
            }}
          />
        </div>
      )}
    </div>
  )
}
