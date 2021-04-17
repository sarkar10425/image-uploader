import Upload from "../components/Upload"
import Loader from "../components/Loader"
import UploadSuccess from "../components/UploadSuccess"
import "../styles/index.css"
import { useState } from "react"

function UploadPage() {
  const [loader, setLoader] = useState(false)
  const [upload, setUpload] = useState(true)
  const [imageUrl, setImageUrl] = useState("")

  const renderCon = () => {
    if (loader) {
      return <Loader />
    } else {
      if (upload) {
        return (
          <Upload
            callLoader={(boolean) => setLoader(boolean)}
            callSuccess={(url) => {
              setImageUrl(url)
              setUpload(false)
            }}
          />
        )
      } else {
        return (
          <UploadSuccess
            imageUrl={imageUrl}
            backToUpload={() => setUpload(true)}
          />
        )
      }
    }
  }
  return (
    <>
      {renderCon()}
      <div className="credit-text">
        <p>created by Kritsana135 - devChallenges.io</p>
      </div>
    </>
  )
}

export default UploadPage
