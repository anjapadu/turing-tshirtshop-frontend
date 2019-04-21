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

            if (i === 6 && this.props.pages > 7) {
                if (this.props.pages === 7) {
                    continue;
                }
                pages.push(<li
                    key={"_elipsis_page"}
                >
                    <span className="pagination-ellipsis">&hellip;</span>
                </li>);
                pages.push(<li
                    key={`_${this.props.pages}`}
                    onClick={this._onChangePage.bind(this, this.props.pages)}
                >
                    <a className={this._getClassName("pagination-link", this.props.pages)} aria-label={"Page " + this.props.pages} aria-current="page">{this.props.pages}</a>
                </li>)
                i = this.props.pages + 1;
            }
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