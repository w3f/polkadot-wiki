import dotSidebar from "../website/sidebars.json";
import ksmSidebar from "../kusama-guide/sidebars.json";
import fs from 'fs';

const Save = [
  "assets"
]

const Languages = [
  "en",
  "ru",
  "zh-CN"
]

const main = () => {
  let sidebar;
  if (process.argv[2] == 'dot') {
    sidebar = dotSidebar;
  } else if (process.argv[2] == 'ksm') {
    sidebar = ksmSidebar;
  } else {
    throw new Error("Please specifiy `dot` or `ksm`.");
  }

  let items = [];
  for (const key of Object.keys(sidebar.docs)) {
    for (const item of sidebar.docs[key]) {
      if (item.ids) {
        items.push(...item.ids);
      } else {
        items.push(item);
      }
    }
  }

  console.log(items);

  const rootDir = process.argv[2] == 'dot' ? 'website/build/polkadot-wiki' : 'kusama-guide/build/kusama-guide-hosting';

  const deleteWithin = (folder) => {
    for (const entry of fs.readdirSync(folder)) {
      if (entry.slice(-4) === 'html') {
        //file
        if (items.indexOf(entry.slice(0, -5)) === -1) {
          console.log('DELETE', `${folder}/${entry}`);
          // delete file
          fs.unlinkSync(`${folder}/${entry}`);
        }
      } else {
        //directory
        if (
          items.indexOf(entry) === -1
          && Save.indexOf(entry) === -1
          && Languages.indexOf(entry) === -1
          ) {
          console.log('DELETE', `${folder}/${entry}`);
          //delete directory
          fs.rmdirSync(`${folder}/${entry}`, { recursive: true });
        }
      }
    }
  }

  deleteWithin(rootDir + '/docs')
  for (const language of Languages) {
    deleteWithin(rootDir + '/docs/' + language);
  }


}

main();
