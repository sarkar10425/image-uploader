import React from "react"
import "../styles/index.css"
import "../styles/upload.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"

export default function UploadedSuccess(props) {
  const copyText = () => {
    navigator.clipboard.writeText(props.imageUrl || "")
  }

  return (
    <div className="box-frame upload-box">
      <div className="content">
        <FontAwesomeIcon
          className="success-icon"
          size="2x"
          color="green"
          icon={faCheckCircle}
        />
        <p className="title-text">Uploaded Successfully!</p>
        <div
          className="preview-image space-between"
          style={{ backgroundImage: `url(${props.imageUrl || ""})` }}
        ></div>
        <div className="result-url-box">
          <span id="text-to-copy">{props.imageUrl || ""}</span>
          <button className="button-frame" onClick={copyText}>
            Copy Link
          </button>
        </div>
        <span
          className="or-text back-to-upload"
          onClick={() => props.backToUpload()}
        >
          back to upload
        </span>
      </div>
    </div>
  )
}
