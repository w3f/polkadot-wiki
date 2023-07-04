# Charts Component

This directory represents the data for loading into the Charts component.

For now, the following graphs are supported:

- `scatter`
- `line`

## Using the Charts component

The charts component may be used in any `md` file within the Wiki:

```js
// Import at the top of the MD file
import Chart from "./../../components/Chart";

// The title can be left empty, type refers to the type of chart or graph, and dataId should refer to
// a dataset within openGovVariables.js

<Chart title="" type="line" dataId="Whitelist" maxX="" maxY="" network="Polkadot" />;
```

## Adding new datasets

Navigate to `components/utilities/openGovVariables.js`, load JSON (either locally or fetched), and
add it to the module exports. The key you provide will be the `dataId` for the component to load.

```js
module.exports = {
  Root: openGovRoot,
  Whitelist: openGovWhitelist,
  Treasurer: openGovTreasurer,
  BigTipper: openGovBigTipper,
  SmallTipper: openGovSmallTipper,
  RefKiller: openGovRefKiller,
  RefCanceller: openGovRefCanceller,
  BigSpender: openGovBigSpender,
  MediumSpender: openGovMediumSpender,
  SmallSpender: openGovSmallSpender,
  AdminAuction: openGovAdminAuction,
  AdminFellowship: openGovAdminFellowship,
  AdminGeneral: openGovAdminGeneral,
  AdminLease: openGovAdminLease,
  AdminStaking: openGovAdminStaking,
  // Add yours here!
};
```
