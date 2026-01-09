'use client'

import Image from "next/image"
import posthog from "posthog-js"

const ExploreBtn = () => {
  return (
    <div>
      <button type="button" id="explore-btn" className="mt-7 mx-auto">
        <a href="#events">
          Explore Events
          <Image src="/icons/arrow-down.svg" alt="arrow-down" width="24" height="24" />
        </a>
      </button>

      <button onClick={() => posthog.capture('test_event')}>
        Click me for an event
      </button>
    </div>
  )
}

export default ExploreBtn