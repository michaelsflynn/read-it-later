// Container
import { connect } from 'react-redux'
import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { setSavedArt } from '../actions'
import Label from 'grommet/components/Label'
import Paragraph from 'grommet/components/Paragraph'
import Tiles from 'grommet/components/Tiles'
import Card from 'grommet/components/Card'
import Heading from 'grommet/components/Heading'
import CloseIcon from 'grommet/components/icons/base/Close'
import Button from 'grommet/components/Button'

class ArticlesSaved extends React.Component {
  constructor (props) {
    super()
    this._onDeleteArt = this._onDeleteArt.bind(this)
    this._onViewArt = this._onViewArt.bind(this)
    // console.log('Articles Contructor Props:', props)
  }

  componentDidMount () {
    this.props._loadSavedArticles(this.props.email)
  }

  _onViewArt (body) {
    window.alert(body)
  }

  _onDeleteArt (id) {
    let url = 'http://localhost:3000/articles/del/' + id
    axios.delete(url)
    .then(response => window.alert(response.data))
    .catch(error => window.alert(error.data))
    this.props._loadSavedArticles(this.props.email)
  }

  render () {
    console.log('Articles Saved Component Rendered', this.props)
    const articles = this.props.savedArticles.map((art) => (
      <div>
        <Card textAlign='center'
          separator='all'
          size='medium'
          key={art._id}
          onClick={() => this._onViewArt(art.body)}
          >
          <Label>{art.title}</Label>
        </Card>
        <Button
          align='center'
          label='Delete Saved Article'
          icon={<CloseIcon />}
          onClick={() => this._onDeleteArt(art._id)} />
      </div>
      ))
    return (
      <div>
        <Heading align={'center'} tag='h3' uppercase >{this.props.srcFilter}</Heading>
        <Tiles size='medium'>
          {articles}
        </Tiles>
      </div>
    )
  }
}

ArticlesSaved.propTypes = {
  savedArticles: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    savedArticles: state.setArticles.savedArticles,
    email: state.setAuth.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _loadSavedArticles: (email) => {
      console.log('Load Saved Articles...', email)
      const url = 'http://localhost:3000/articles/get/' + email
      axios.get(url)
      .then(response => dispatch(setSavedArt(response.data)))
      .catch(err => console.log(err))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesSaved)
