

const openGovRoot = require('./charts_data/opengov_root.json');

const openGovAdminAuction = require('./charts_data/opengov_admin_auction.json');
const openGovAdminFellowship = require('./charts_data/opengov_admin_fellowship.json');
const openGovAdminGeneral = require('./charts_data/opengov_admin_general.json');
const openGovAdminLease = require('./charts_data/opengov_admin_lease.json');
const openGovAdminStaking = require('./charts_data/opengov_admin_staking.json');

const openGovBigSpender = require('./charts_data/opengov_big_spender.json');
const openGovMediumSpender = require('./charts_data/opengov_medium_spender.json');
const openGovSmallSpender = require('./charts_data/opengov_small_spender.json');

const openGovBigTipper = require('./charts_data/opengov_big_tipper.json');
const openGovSmallTipper = require('./charts_data/opengov_small_tipper.json');

const openGovRefCanceller = require('./charts_data/opengov_ref_canceller.json');
const openGovRefKiller = require('./charts_data/opengov_ref_killer.json');

const openGovTreasurer = require('./charts_data/opengov_treasurer.json');
const openGovWhitelist = require('./charts_data/opengov_whitelist.json');


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
    AdminStaking: openGovAdminStaking
};