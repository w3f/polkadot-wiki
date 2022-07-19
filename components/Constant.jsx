/*
This very simple component is used for tracking global constants.
Unlike the RPC-Connection component, no API calls are required.

This component is mainly useful for identifying where global constants
live in the repo when an update or change is required.  
Otherwise, it would be challenging to identify all references to the constant
as they would just be hard-coded values in the repo.

The component can be used in Docusaurus markdown by adding the following lines anywhere within the file.

import Constant from "./../../components/Constant"
<Constant value={6} gid="block_target_in_seconds"/>
*/

function RenderConstant({value, gid, filter=undefined}) { 
	if (filter !== undefined) {
		switch (filter) {
			case "blocksToDays":
				value = (value * 6) / 86400;
				break;
			default:
				console.log("Ignoring unknown filter type");
		}
	}

	return (value.toString());
}

export default RenderConstant;