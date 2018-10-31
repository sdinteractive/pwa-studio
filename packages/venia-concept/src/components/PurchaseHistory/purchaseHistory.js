import React, { Component } from 'react';
import { shape, number, string, date, arrayOf } from 'prop-types';
import { List } from '@magento/peregrine';

import PurchaseHistoryItem from './PurchaseHistoryItem';
import classify from 'src/classify';
import defaultClasses from './purchaseHistory.css';
import Filter from './Filter';

class PurchaseHistory extends Component {
    static propTypes = {
        classes: shape({
            body: string,
            filterContainer: string,
            itemsContainer: string
        }),
        items: arrayOf(
            shape({
                id: number,
                imageSrc: string,
                title: string,
                date: date,
                link: string
            })
        )
    };

    componentDidMount() {
        const { getPurchaseHistory } = this.props;
        getPurchaseHistory();
    }

    componentWillUnmount() {
        const { resetPurchaseHistory } = this.props;
        resetPurchaseHistory();
    }

    render() {
        const { classes, items, isFetching } = this.props;
        return (
            <div className={classes.body}>
                <div className={classes.filterContainer}>
                    <Filter />
                </div>
                <List
                    isLoading={isFetching}
                    items={items}
                    getItemKey={({ id }) => id}
                    render={props => (
                        <ul className={classes.itemsContainer}>
                            {props.children}
                        </ul>
                    )}
                    renderItem={props => (
                        <li>
                            <PurchaseHistoryItem {...props} />
                        </li>
                    )}
                    renderLoadingState={() => <div>Loading...</div>}
                    renderEmptyState={() => (
                        <div>Purchase history is empty.</div>
                    )}
                />
            </div>
        );
    }
}

export default classify(defaultClasses)(PurchaseHistory);
