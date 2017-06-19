// Container
import { connect } from 'react-redux'
import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { setArt } from '../actions'
import Image from 'grommet/components/Image'
import Label from 'grommet/components/Label'
import Paragraph from 'grommet/components/Paragraph'
import Tiles from 'grommet/components/Tiles'
import Card from 'grommet/components/Card'
import Heading from 'grommet/components/Heading'
import DownloadIcon from 'grommet/components/icons/base/Download'
import Button from 'grommet/components/Button'

class ArticleList extends React.Component {
  constructor (props) {
    super()
    this._goURL = this._goURL.bind(this)
    this._onSaveArt = this._onSaveArt.bind(this)
    // console.log('Articles Contructor Props:', props)
  }

  componentDidMount () {
    console.log('ComponentDidMount..', this.props.srcFilter)
    this.props._loadInitArticles(this.props.srcFilter)
  }

  _goURL (url) {
    window.open(url)
  }

  _onSaveArt (url, email) {
    axios.post('http://localhost:3000/articles/post', {
      url: url,
      user: email
    })
    .then(response => window.alert(response.data))
    .catch(error => window.alert(error.data))
  }

  render () {
    console.log('Articles Layer Component Rendered', this.props.srcFilter)
    const articles = this.props.articles.map((art, idx) => (
      <div>
        <Card textAlign='center'
          separator='all'
          size='medium'
          key={idx}
          onClick={() => this._goURL(art.url)}
          >
          <Image src={art.urlToImage} />
          <Label>{art.title}</Label>
          <Paragraph>{art.description}</Paragraph>
        </Card>
        <Button
          label='Save for Later'
          icon={<DownloadIcon />}
          onClick={() => this._onSaveArt(art.url, this.props.email)} />
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

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    srcFilter: state.setSources.srcFilter,
    showArticles: state.setArticles.showArticles,
    articles: state.setArticles.articles,
    email: state.setAuth.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _loadInitArticles: (src) => {
      console.log('Load Init Articles...', src)
      const url = 'https://newsapi.org/v1/articles?source=' + src + '&sortBy=top&apiKey=c6a6b6c8a55d4ddcacd7ca0a32c8f20a'
      axios.get(url)
      .then(response => dispatch(setArt(src, response.data)))
      .catch(err => console.log(err))
    }
  }
}

const ArticlesLayer = connect(mapStateToProps, mapDispatchToProps)(ArticleList)

export default ArticlesLayer
