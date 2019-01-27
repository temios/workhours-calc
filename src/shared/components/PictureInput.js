import * as React from 'react'
import { FormGroup, Label, Col, Input } from 'reactstrap'
import { Fragment } from 'react'
import pictureService from '../../services/pictureService'

class PictureInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      previewURL: ''
    }
    this.handlePictureInput = this.handlePictureInput.bind(this)
    this.rerenderPicture = this.rerenderPicture.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.imageURL !== this.props.imageURL) {
      this.rerenderPicture()
    }
  }

  componentDidMount () {
    pictureService.resetDraftUrl()
    this.rerenderPicture()
  }

  rerenderPicture () {
    let previewURL = ''
    if (this.props.imageURL) {
      previewURL = this.props.imageURL.indexOf('\\') === -1
        ?
        pictureService.getPath() + this.props.imageURL
        : pictureService.draftUrl
    }
    this.setState({ previewURL: previewURL })
  }

  handlePictureInput (e) {
    if (e.target.files.length === 0) return
    let value = e.target.files[0].path
    let previewURL = URL.createObjectURL(e.target.files[0])
    pictureService.draftUrl = previewURL
    this.props.handleInput(value)
    this.setState({previewURL: previewURL})
  }

  render () {
    return (
      <Fragment>
        <FormGroup row>
          <Label for='picture' md={2}>
            {this.props.label}:&nbsp;
          </Label>
          <Col md={4}>
            <Input
              type='file'
              name='picture'
              id='picture'
              accept='.png,.jpeg,.jpg'
              invalid={
                this.props.invalid
              }
              onChange={this.handlePictureInput}
            />
          </Col>
          <Col md={{size: 6}}>
            <div className={'text-right'}>
              <img src={this.state.previewURL}
                   className={this.props.previewClass}
                   alt=''
                   onClick={this.props.handleImgClick}
              />
            </div>
          </Col>
        </FormGroup>
        <FormGroup row>

        </FormGroup>
      </Fragment>
    )
  }
}

export default PictureInput