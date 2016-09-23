const Product = React.createClass ({
  handleUpVote() {
    this.props.onUpVote(this.props.id)
  },

  handleDownVote() {
    this.props.onDownVote(this.props.id)
  },

  render () {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.product_image_url} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}><i className="large caret up icon"></i></a>
            {this.props.votes}
            <a onClick={this.handleDownVote}><i className="large caret down icon"></i></a>
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img className="ui avatar image" src={this.props.submitter_avatar_url} />
          </div>
        </div>
      </div>
    )
  }
})



const ProductList = React.createClass ({
  getInitialState() {
    return {
      products: [],
    }
  },

  componentDidMount() {
    this.updateState()
  },

  updateState() {
    const products = Data.sort((a, b) => {
      return b.votes - a.votes
    })
    this.setState({products})
  },

  handleProductUpVote(productId) {
    Data.forEach((product) => {
      if (product.id === productId) {
        product.votes = product.votes + 1
        return
      }
    })
    this.updateState()
  },

  handleProductDownVote(productId) {
    Data.forEach((product) => {
      if (product.id === productId) {
        product.votes = product.votes - 1
        return
      }
    })
    this.updateState()
  },

  render () {
    const products = this.state.products.map((product, i) => {
      return <Product
              key={i}
              id={product.id}
              title={product.title}
              description={product.description}
              url={product.url}
              votes={product.votes}
              submitter_avatar_url={product.submitter_avatar_url}
              product_image_url={product.product_image_url}
              onUpVote={this.handleProductUpVote}
              onDownVote={this.handleProductDownVote} />
    })

    return(
      <div className="ui items">
        {products}
      </div>
    )
  }
})

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
)
