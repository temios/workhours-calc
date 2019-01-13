import { connect } from 'react-redux'
import PartForm from './PartForm'
import { reloadParts } from '../../actions'
import api from '../../services/ipc'

const mapDispatchToProps = (dispatch) => ({
  addPart: (properties) => {
    api.savePart(properties).then(
      response => {
        api.getParts(response.id_category).then(parts => {
          dispatch(reloadParts(response.id_category, parts))
        })
      },
      err => console.log(err.message)
    )
  }
})

function mapStateToProps (state) {
  return {
    categories: state.catalogReducer.categories,
    part: {
      category: '',
      name: '',
      hour: '',
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
