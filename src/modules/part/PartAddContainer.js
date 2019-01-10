import { connect } from 'react-redux'
import PartForm from './PartForm'
import { addPartToDB } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  addPart: (properties) => {
    dispatch(addPartToDB(properties))
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
