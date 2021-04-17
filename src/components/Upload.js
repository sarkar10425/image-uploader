import React from "react"
import "../styles/index.css"
import "../styles/upload.css"
import qs from "qs"
import axios from "axios"

export default function Upload(props) {
  const uploadImage = async (event) => {
    let image
    if (event.target) image = event.target.files[0]
    else image = event
    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader()
      fileReader.onload = (e) => resolve(fileReader.result)
      fileReader.readAsDataURL(image)
    })
    props.callLoader(true)
    const result = await axios({
      method: "post",
      url: process.env.REACT_APP_API_URL + "/upload",
      data: qs.stringify({
        base64: result_base64,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
    props.callLoader(false)
    if (result.data.success === true) {
      props.callSuccess(result.data.url)
    }
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth }
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone }
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) }
      default:
        return state
    }
  }

  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  })

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 })
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 })
    // if (data.dropDepth > 0) return
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()

    e.dataTransfer.dropEffect = "copy"
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    let files = [...e.dataTransfer.files]
    uploadImage(files[0])
    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name)
      files = files.filter((f) => !existingFiles.includes(f.name))

      dispatch({ type: "ADD_FILE_TO_LIST", files })
      dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 })
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false })
    }
  }

  return (
    <div className="box-frame upload-box">
      <div className="content">
        <p className="title-text">Upload your image</p>
        <p className="file-shoud-text space-between">
          File should be Jpeg, Png,...
        </p>
        <div
          className={
            data.inDropZone ? "drop-item inside-drop-item" : "drop-item"
          }
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}
        >
          <img src="/img/image.svg" alt="mock-upload" />
          <p className="drag-drop-text">Drag & Drop your image here</p>
        </div>
        <p className="or-text space-between">or</p>
        <label className="button-frame">
          <input
            type="file"
            accept="image/*"
            id="store-image"
            onChange={uploadImage}
          />
          Choose a file
        </label>
      </div>
    </div>
  )
}
