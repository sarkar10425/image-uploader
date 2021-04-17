import React from "react"
import "../styles/index.css"
import "../styles/loader.css"

export default function Box() {
  return (
    <>
      <div className="box-frame loader-box">
        <p>Uploading...</p>
        <div className="progress">
          <div className="progress-value"></div>
        </div>
      </div>
    </>
  )
}
