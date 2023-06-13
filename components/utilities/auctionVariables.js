/*
Variables related to the Auction-Schedule Component. Mostly contains GraphQL queries.
*/

import { gql } from "@apollo/client";

/**
* @constant AUCTIONS GraphQL query - fetches all auctions from indexer, as well as current block height in ascending order.
*/
export const AUCTIONS = gql`
query AUCTION {
  auctions(orderBy: biddingStartBlock_height_ASC) {
    id
    status
    biddingEndsBlock {
      height
      timestamp
    }
    biddingStartBlock {
      height
      timestamp
    }
    endPeriodBlock {
      height
      timestamp
    }
    onboardEndBlock {
      height
      timestamp
    }
    onboardStartBlock {
      height
      timestamp
    }
    startBlock {
      timestamp
      height
    }
  }
  squidStatus {
    height
  }
}`;

/**
 * @constant supportedNetworks - networks supported by the Auctions component
 */
export const supportedNetworks = {
	POLKADOT: "polkadot",
	KUSAMA: "kusama"
};


