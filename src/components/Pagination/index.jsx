import React, { PureComponent } from 'react';

class Pagination extends PureComponent {
    state = {
        page: 1
    }
    _getClassName(className, page) {
        let c = className;
        if (page === (this.props.page || this.state.page))
            c = `${c} is-current`;
        return c;
    }
    _renderPages() {
        let pages = [];
        for (let i = 1; i <= (this.props.pages || 1); i++) {
            pages.push(<li
                key={`_${i}`}
                onClick={this._onChangePage.bind(this, i)}
            >
                <a className={this._getClassName("pagination-link", i)} aria-label="Page 1" aria-current="page">{i}</a>
            </li>)
        }
        return pages;
    }
    _onChangePage(page) {
        this.setState({
            page
        }, () => {
            this.props.onChangePage(page)
        })
    }
    render() {
        return (<nav
            style={this.props.style || {}}
            className="pagination"
            role="navigation"
            aria-label="pagination"
        >
            <ul className="pagination-list">
                {this._renderPages()}
            </ul>
        </nav>)
    }
}

export default Pagination;