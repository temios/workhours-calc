import { connect } from 'react-redux'
import PartForm from './PartForm'
import { addPartToDB } from '../../actions'
import api from '../../services/ipc'

const mapDispatchToProps = (dispatch) => ({
  addPart: (properties) => {
    api.savePart(properties).then(
      response => {
        console.log(response)
        dispatch(addPartToDB(response))
      }
      //err => dispatch(error(err))
    )
  }
})

function mapStateToProps (state) {
  return {
    categories: state.catalogReducer.categories,
    part: {
      category: '',
      name: '',
      hours: '',
      picture: '',
      id: 0
    },
    isEdit: false
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartForm)
