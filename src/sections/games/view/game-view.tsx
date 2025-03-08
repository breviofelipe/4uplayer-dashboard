import { useState } from "react";

import { Box , Tab , Link, Tabs, Button, Drawer, TextField, Typography } from "@mui/material";

import { useAppSelector } from "src/routes/hooks/hookes";

import { CONFIG } from "src/config-global";

import PhotoGallery from "./components/PhotoGallery";

import type { GameItemProps } from "../game-item";


// const [tabIndex, setTabIndex] = useState(0);



// return (
//     <Box>
//         <Tabs value={tabIndex} onChange={handleTabChange} aria-label="game tabs">
//             <Tab label="Details" />
//             <Tab label="Attributes" />
//         </Tabs>
//         {renderTabContent()}
//     </Box>
// );

const data = {
    "_id": "wrap",
    "documents": [
      {
        "id": {
          "$oid": "67c90defca18876f778bd21e"
        },
        "nome": "Candy Cane",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_007_candycane/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_007_candycane/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_007_candycane/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90defca18876f778bd21f"
        },
        "nome": "Disco",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_009_newyears/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_009_newyears/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_009_newyears/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90df0ca18876f778bd221"
        },
        "nome": "Hot & Cold",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_011_hotcold/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_011_hotcold/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_011_hotcold/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df0ca18876f778bd222"
        },
        "nome": "Golden Clouds",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_012_dragonmask/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_012_dragonmask/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_012_dragonmask/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90df0ca18876f778bd223"
        },
        "nome": "Valentine",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_013_valentines/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_013_valentines/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_013_valentines/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df0ca18876f778bd224"
        },
        "nome": "Sprinkles",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_014_icecream/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_014_icecream/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_014_icecream/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df0ca18876f778bd225"
        },
        "nome": "Chromatic",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_015_snowboard/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_015_snowboard/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_015_snowboard/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df1ca18876f778bd226"
        },
        "nome": "Cuddle Hearts",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_016_cuddleteam/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_016_cuddleteam/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_016_cuddleteam/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90df1ca18876f778bd228"
        },
        "nome": "Magma",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_018_magma/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_018_magma/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_018_magma/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c90df3ca18876f778bd22e"
        },
        "nome": "Stealth Black",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_024_stealthblack/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_024_stealthblack/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_024_stealthblack/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df3ca18876f778bd230"
        },
        "nome": "Lucky",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_027_lucky/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_027_lucky/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_027_lucky/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df4ca18876f778bd231"
        },
        "nome": "Heat",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_028_devillace/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_028_devillace/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_028_devillace/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90df4ca18876f778bd232"
        },
        "nome": "Clubs",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_029_heistclub/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_029_heistclub/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_029_heistclub/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df4ca18876f778bd233"
        },
        "nome": "Diamonds",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_030_heistdiamond/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_030_heistdiamond/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_030_heistdiamond/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df4ca18876f778bd234"
        },
        "nome": "Hearts",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_031_heistheart/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_031_heistheart/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_031_heistheart/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df5ca18876f778bd235"
        },
        "nome": "Spades",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_032_heistspade/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_032_heistspade/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_032_heistspade/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df5ca18876f778bd236"
        },
        "nome": "Pineapple",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_033_tropicalgirl/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_033_tropicalgirl/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_033_tropicalgirl/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df5ca18876f778bd237"
        },
        "nome": "Rivet",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_034_waypoint/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_034_waypoint/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_034_waypoint/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df6ca18876f778bd238"
        },
        "nome": "Golden Scales",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_035_goldensnake/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_035_goldensnake/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_035_goldensnake/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90df6ca18876f778bd239"
        },
        "nome": "Infernal",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_036_evilsuit/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_036_evilsuit/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_036_evilsuit/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df6ca18876f778bd23a"
        },
        "nome": "Burnmark",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_037_evilsuit2/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_037_evilsuit2/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_037_evilsuit2/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df7ca18876f778bd23f"
        },
        "nome": "Bandage",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_042_bandageninja/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_042_bandageninja/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_042_bandageninja/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df7ca18876f778bd240"
        },
        "nome": "Digital Grayscale",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_043_bandolette/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_043_bandolette/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_043_bandolette/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90df8ca18876f778bd241"
        },
        "nome": "Dogfight",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_044_battleplane/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_044_battleplane/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_044_battleplane/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90dfbca18876f778bd242"
        },
        "nome": "Divine",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_045_angel/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_045_angel/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_045_angel/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90dfbca18876f778bd243"
        },
        "nome": "Cursed",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_046_demon/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_046_demon/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_046_demon/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90dfcca18876f778bd244"
        },
        "nome": "Spring Party",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_047_bunny/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_047_bunny/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_047_bunny/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90dfcca18876f778bd245"
        },
        "nome": "Pastel Print",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_048_bunny2/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_048_bunny2/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_048_bunny2/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90dfdca18876f778bd246"
        },
        "nome": "Dino",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_049_pajamapartygreen/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_049_pajamapartygreen/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_049_pajamapartygreen/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90dfdca18876f778bd247"
        },
        "nome": "Triassic",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_050_pajamapartyred/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_050_pajamapartyred/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_050_pajamapartyred/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90dfeca18876f778bd248"
        },
        "nome": "Shard Break",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_051_shatterfly/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_051_shatterfly/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_051_shatterfly/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90dffca18876f778bd24d"
        },
        "nome": "Widow's Web",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_056_blackwidow/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_056_blackwidow/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_056_blackwidow/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e02ca18876f778bd254"
        },
        "nome": "Bubblegum",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_063_strawberrypilot/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_063_strawberrypilot/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_063_strawberrypilot/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e02ca18876f778bd255"
        },
        "nome": "Royale Air Force",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_064_raptor/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_064_raptor/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_064_raptor/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e02ca18876f778bd256"
        },
        "nome": "Boogeyman",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_065_assassinsuit01/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_065_assassinsuit01/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_065_assassinsuit01/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e05ca18876f778bd257"
        },
        "nome": "Assassin",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_066_assassinsuit02/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_066_assassinsuit02/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_066_assassinsuit02/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e05ca18876f778bd258"
        },
        "nome": "Enigma",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_067_streetdemon/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_067_streetdemon/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_067_streetdemon/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e05ca18876f778bd259"
        },
        "nome": "Converge",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_069_geisha/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_069_geisha/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_069_geisha/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e05ca18876f778bd25a"
        },
        "nome": "Emblem",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_070_maskedwarrior/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_070_maskedwarrior/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_070_maskedwarrior/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e05ca18876f778bd25b"
        },
        "nome": "Ruff",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_071_pug/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_071_pug/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_071_pug/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e06ca18876f778bd25c"
        },
        "nome": "Fish Face",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_072_teriyakifish/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_072_teriyakifish/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_072_teriyakifish/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e07ca18876f778bd25d"
        },
        "nome": "Fishy",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_073_teriyakifish2/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_073_teriyakifish2/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_073_teriyakifish2/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e07ca18876f778bd25e"
        },
        "nome": "Slippery",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_074_teriyakifishvr/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_074_teriyakifishvr/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_074_teriyakifishvr/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e07ca18876f778bd25f"
        },
        "nome": "Ripple",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_075_lineswirl/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_075_lineswirl/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_075_lineswirl/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e07ca18876f778bd260"
        },
        "nome": "Hex Wave",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_076_cyberrunner/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_076_cyberrunner/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_076_cyberrunner/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e07ca18876f778bd261"
        },
        "nome": "Turbulent",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_077_stormsoldier/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_077_stormsoldier/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_077_stormsoldier/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e08ca18876f778bd262"
        },
        "nome": "Slurp!",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_078_slurpjuice/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_078_slurpjuice/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_078_slurpjuice/featured.png"
        },
        "rarity": {
          "displayValue": "Slurp Series",
          "backendValue": "EFortRarity::Epic",
          "value": "slurp"
        }
      },
      {
        "id": {
          "$oid": "67c90e09ca18876f778bd264"
        },
        "nome": "Contrast",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_080_blackout1/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_080_blackout1/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_080_blackout1/featured.png"
        },
        "rarity": {
          "displayValue": "Shadow Series",
          "backendValue": "EFortRarity::Rare",
          "value": "shadow"
        }
      },
      {
        "id": {
          "$oid": "67c90e09ca18876f778bd265"
        },
        "nome": "Array",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_081_blackout2/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_081_blackout2/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_081_blackout2/featured.png"
        },
        "rarity": {
          "displayValue": "Shadow Series",
          "backendValue": "EFortRarity::Rare",
          "value": "shadow"
        }
      },
      {
        "id": {
          "$oid": "67c90e0aca18876f778bd268"
        },
        "nome": "Fireworks",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_084_4thofjuly/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_084_4thofjuly/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_084_4thofjuly/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e0bca18876f778bd269"
        },
        "nome": "Tidal Wave",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_085_beach/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_085_beach/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_085_beach/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c90e0bca18876f778bd26a"
        },
        "nome": "Blue Camo",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_086_standardbluecamo/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_086_standardbluecamo/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_086_standardbluecamo/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e0bca18876f778bd26b"
        },
        "nome": "Brite Stars",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_087_britebombersummer/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_087_britebombersummer/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_087_britebombersummer/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e0cca18876f778bd26c"
        },
        "nome": "Kitsune",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_088_driftsummer/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_088_driftsummer/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_088_driftsummer/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e0cca18876f778bd26d"
        },
        "nome": "Core",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_089_glowbro1/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_089_glowbro1/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_089_glowbro1/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e0cca18876f778bd26e"
        },
        "nome": "Essence",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_090_glowbro2/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_090_glowbro2/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_090_glowbro2/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e0dca18876f778bd270"
        },
        "nome": "Flowerprint",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_092_sarong/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_092_sarong/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_092_sarong/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e0eca18876f778bd271"
        },
        "nome": "Hexform",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_093_techmage/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_093_techmage/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_093_techmage/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e0eca18876f778bd272"
        },
        "nome": "Hypermelon",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_094_watermelon/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_094_watermelon/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_094_watermelon/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e0eca18876f778bd273"
        },
        "nome": "Tendrils",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_095_weirdobjects/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_095_weirdobjects/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_095_weirdobjects/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e0eca18876f778bd274"
        },
        "nome": "Bizzy",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_096_zodiac/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_096_zodiac/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_096_zodiac/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e0eca18876f778bd275"
        },
        "nome": "Scanline",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_097_neonlines/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_097_neonlines/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_097_neonlines/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e0fca18876f778bd276"
        },
        "nome": "Frosted",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_098_birthday2019/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_098_birthday2019/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_098_birthday2019/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e0fca18876f778bd277"
        },
        "nome": "Stinger",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_099_cyberkarate/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_099_cyberkarate/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_099_cyberkarate/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e0fca18876f778bd278"
        },
        "nome": "Squared",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_100_digitalshift/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_100_digitalshift/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_100_digitalshift/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e0fca18876f778bd279"
        },
        "nome": "Mecha Team",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_101_multibot/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_101_multibot/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_101_multibot/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e10ca18876f778bd27a"
        },
        "nome": "World Cup 2019",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_102_worldcup2019/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_102_worldcup2019/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_102_worldcup2019/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e10ca18876f778bd27b"
        },
        "nome": "Red Line",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_103_yatter/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_103_yatter/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_103_yatter/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e11ca18876f778bd27c"
        },
        "nome": "Bubbly Bombs",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_104_bubblegum/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_104_bubblegum/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_104_bubblegum/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e13ca18876f778bd283"
        },
        "nome": "Eternal Zero",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_111_zeropointceiling/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_111_zeropointceiling/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_111_zeropointceiling/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e14ca18876f778bd284"
        },
        "nome": "Fractal Zero",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_112_zeropointenergy/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_112_zeropointenergy/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_112_zeropointenergy/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e14ca18876f778bd285"
        },
        "nome": "Radiant Zero",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_113_zeropointfloor/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_113_zeropointfloor/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_113_zeropointfloor/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e14ca18876f778bd287"
        },
        "nome": "Emotical",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_116_emotigun/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_116_emotigun/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_116_emotigun/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e15ca18876f778bd288"
        },
        "nome": "Meteor",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_117_asteroid/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_117_asteroid/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_117_asteroid/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e15ca18876f778bd289"
        },
        "nome": "Corrupted",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_118_astronautevil/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_118_astronautevil/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_118_astronautevil/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e16ca18876f778bd28a"
        },
        "nome": "White Dragon",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_119_dragontag/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_119_dragontag/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_119_dragontag/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e16ca18876f778bd28c"
        },
        "nome": "Red Camo",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_122_standardredcamo/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_122_standardredcamo/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_122_standardredcamo/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e16ca18876f778bd28d"
        },
        "nome": "Cuddle Camo",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_123_streetpink/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_123_streetpink/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_123_streetpink/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e18ca18876f778bd28e"
        },
        "nome": "Angled Fire",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_124_syko/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_124_syko/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_124_syko/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e18ca18876f778bd28f"
        },
        "nome": "Clockwork",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_125_clockwork/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_125_clockwork/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_125_clockwork/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e19ca18876f778bd290"
        },
        "nome": "Square Stream",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_126_circlefade/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_126_circlefade/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_126_circlefade/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e1bca18876f778bd294"
        },
        "nome": "Zesty",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_130_lemonlime/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_130_lemonlime/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_130_lemonlime/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e1bca18876f778bd295"
        },
        "nome": "Ultra Sour",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_131_lemonlimejuice/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_131_lemonlimejuice/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_131_lemonlimejuice/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e1cca18876f778bd297"
        },
        "nome": "Angular Flow",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_133_metaltri/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_133_metaltri/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_133_metaltri/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e1cca18876f778bd298"
        },
        "nome": "Fingerprint",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_134_fingerprint/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_134_fingerprint/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_134_fingerprint/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e1dca18876f778bd299"
        },
        "nome": "Taffy",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_135_licoriceswirl/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_135_licoriceswirl/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_135_licoriceswirl/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e1dca18876f778bd29a"
        },
        "nome": "Faded Cool",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_136_punchy/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_136_punchy/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_136_punchy/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e1dca18876f778bd29b"
        },
        "nome": "Dreamy",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_137_sleepytime/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_137_sleepytime/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_137_sleepytime/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e1eca18876f778bd29c"
        },
        "nome": "Forever Tuesday",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_138_taco/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_138_taco/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_138_taco/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e1eca18876f778bd29d"
        },
        "nome": "Prismatic Edge",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_139_prismatic/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_139_prismatic/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_139_prismatic/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e1eca18876f778bd29e"
        },
        "nome": "Brite Blast",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_141_brightgunnerremix/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_141_brightgunnerremix/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_141_brightgunnerremix/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e1fca18876f778bd29f"
        },
        "nome": "Modern Hex",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_142_honeycombgrey/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_142_honeycombgrey/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_142_honeycombgrey/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e1fca18876f778bd2a0"
        },
        "nome": "Wild Rainbow",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_143_rainbowstrike/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_143_rainbowstrike/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_143_rainbowstrike/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e1fca18876f778bd2a1"
        },
        "nome": "Lotus Star",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_144_sakura/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_144_sakura/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_144_sakura/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e1fca18876f778bd2a2"
        },
        "nome": "Silver Flame",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_145_kurohomura/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_145_kurohomura/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_145_kurohomura/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e1fca18876f778bd2a3"
        },
        "nome": "Wavebreaker",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_146_bulletblue/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_146_bulletblue/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_146_bulletblue/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e20ca18876f778bd2a4"
        },
        "nome": "Rustler Plaid",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_147_codsquadplaid/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_147_codsquadplaid/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_147_codsquadplaid/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90e21ca18876f778bd2a7"
        },
        "nome": "Wolfhunter",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_150_redridingremix/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_150_redridingremix/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_150_redridingremix/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e22ca18876f778bd2aa"
        },
        "nome": "Zero Point",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_154_haunt/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_154_haunt/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_154_haunt/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90e22ca18876f778bd2ad"
        },
        "nome": "Snuggs Shine",
        "descrition": "Show your style.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/wrap_157_cuddleteamdark/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/wrap_157_cuddleteamdark/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/wrap_157_cuddleteamdark/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      }
    ]
    };

const data2 = {
    "_id": "backpack",
    "documents": [
      {
        "id": {
          "$oid": "67c90062ca18876f778ba9a7"
        },
        "nome": "NaNa Scroll",
        "descrition": "Wisdom begins in flavor.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_bananaphilosopher/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_bananaphilosopher/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_bananaphilosopher/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90063ca18876f778ba9aa"
        },
        "nome": "Bun Buds",
        "descrition": "They've got nothing better to do than loaf around.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_batterboi/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_batterboi/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_batterboi/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90065ca18876f778ba9b1"
        },
        "nome": "Tsukamoto Bear",
        "descrition": "A bear-like curse used for Yuji's training.",
        "images": {
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_birdnest/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_birdnest/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c90067ca18876f778ba9b2"
        },
        "nome": "Winged Toad Summon",
        "descrition": "A technique that combines the shikigami of Nue and Toad.",
        "images": {
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_birdnestgreen/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_birdnestgreen/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c9006aca18876f778ba9bc"
        },
        "nome": "Holo-Glow",
        "descrition": "Send flowers.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_bonemarrow/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_bonemarrow/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_bonemarrow/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c9006dca18876f778ba9c3"
        },
        "nome": "Snowshadow Slingpack",
        "descrition": "A stealth operative's seasonal slingpack.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_brightbuckles/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_brightbuckles/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_brightbuckles/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90075ca18876f778ba9d7"
        },
        "nome": "Peelverine Plush",
        "descrition": "Keep your friends close and your nemesis closer.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_cattlejar/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_cattlejar/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_cattlejar/featured.png"
        },
        "rarity": {
          "displayValue": "MARVEL SERIES",
          "backendValue": "EFortRarity::Rare",
          "value": "marvel"
        }
      },
      {
        "id": {
          "$oid": "67c9007bca18876f778ba9e9"
        },
        "nome": "Winged Victory",
        "descrition": "Fly past the rest.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_coatcheck/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_coatcheck/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_coatcheck/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90085ca18876f778baa06"
        },
        "nome": "Heartbeat Speaker",
        "descrition": "Listen to the beats of your heart.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_cupidhunter/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_cupidhunter/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_cupidhunter/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90088ca18876f778baa0e"
        },
        "nome": "Enigma Shift",
        "descrition": "An elegantly-engineered mystery.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_darkninjawhite/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_darkninjawhite/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_darkninjawhite/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c9008bca18876f778baa17"
        },
        "nome": "Sakaaran Shield",
        "descrition": "Built with scrap from around Sakaar and adorned with the champion's necklace.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_densefog/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_densefog/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_densefog/featured.png"
        },
        "rarity": {
          "displayValue": "MARVEL SERIES",
          "backendValue": "EFortRarity::Rare",
          "value": "marvel"
        }
      },
      {
        "id": {
          "$oid": "67c90090ca18876f778baa20"
        },
        "nome": "Jack's Prize",
        "descrition": "Bottled naturally at the source.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_domeroof/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_domeroof/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_domeroof/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90093ca18876f778baa2a"
        },
        "nome": "Vault Boy Bobblehead",
        "descrition": "Now that's real charisma!",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_duskbelt/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_duskbelt/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_duskbelt/featured.png"
        },
        "rarity": {
          "displayValue": "Gaming Legends Series",
          "backendValue": "EFortRarity::Rare",
          "value": "gaminglegends"
        }
      },
      {
        "id": {
          "$oid": "67c90095ca18876f778baa30"
        },
        "nome": "Bichota Season Flower",
        "descrition": "Petals on the wind.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_elegantlilyankle/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_elegantlilyankle/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_elegantlilyankle/featured.png"
        },
        "rarity": {
          "displayValue": "Icon Series",
          "backendValue": "EFortRarity::Rare",
          "value": "icon"
        }
      },
      {
        "id": {
          "$oid": "67c9009eca18876f778baa4d"
        },
        "nome": "Baller Stick",
        "descrition": "At halftime he throws floppers into the stands.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_firstclass/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_firstclass/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_firstclass/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900a1ca18876f778baa53"
        },
        "nome": "The Beauty Bowl",
        "descrition": "For the perfectly-groomed gourmand.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_fluffwoof/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_fluffwoof/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_fluffwoof/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900a4ca18876f778baa59"
        },
        "nome": "FNCS Defender",
        "descrition": "Protect what you've earned.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs24/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs24/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs24/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c900a6ca18876f778baa5b"
        },
        "nome": "Competitive Crest",
        "descrition": "Out to win.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs26/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs26/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs26/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c900a8ca18876f778baa62"
        },
        "nome": "Victor's Crest",
        "descrition": "Get the win.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s28/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s28/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s28/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c900a9ca18876f778baa63"
        },
        "nome": "Challenger's Crest",
        "descrition": "Show them how you win.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s29/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s29/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s29/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c900a9ca18876f778baa64"
        },
        "nome": "Winner's Emblem",
        "descrition": "The mark of a true FNCS champion.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s30/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s30/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s30/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900aaca18876f778baa65"
        },
        "nome": "The Gold",
        "descrition": "Always get the gold.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s31/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s31/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s31/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900aaca18876f778baa66"
        },
        "nome": "Expert's Emblem",
        "descrition": "Marked by excellence.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s32/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s32/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s32/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900abca18876f778baa67"
        },
        "nome": "FNCS Ace",
        "descrition": "Compete on the wild side.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s33/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s33/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_fncs_s33/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900adca18876f778baa70"
        },
        "nome": "Ordnance Defusion Pack",
        "descrition": "Defuse. Disarm. Neutralize. Win.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_furyfax/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_furyfax/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_furyfax/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900afca18876f778baa75"
        },
        "nome": "Grogu",
        "descrition": "Grogu wants more cookies, please.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_gallonbag/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_gallonbag/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_gallonbag/featured.png"
        },
        "rarity": {
          "displayValue": "Star Wars Series",
          "backendValue": "EFortRarity::Rare",
          "value": "starwars"
        }
      },
      {
        "id": {
          "$oid": "67c900b0ca18876f778baa79"
        },
        "nome": "Pickle Rick",
        "descrition": "Boom! I'm Pickle Rick!",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_geniusstandalone/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_geniusstandalone/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_geniusstandalone/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c900b1ca18876f778baa7b"
        },
        "nome": "Access Core",
        "descrition": "Accessibility is the key.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_globedigital/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_globedigital/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_globedigital/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900b5ca18876f778baa83"
        },
        "nome": "Stinger's Wings",
        "descrition": "A good operative knows when to bzzz out.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_graffitifry/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_graffitifry/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_graffitifry/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900b6ca18876f778baa86"
        },
        "nome": "Hopper's Cabin Diorama",
        "descrition": "Time to do or diorama.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_groovyreader/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_groovyreader/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_groovyreader/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900b6ca18876f778baa89"
        },
        "nome": "Le Cordon Noir",
        "descrition": "For all the gourmet grub.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_grumblewoof/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_grumblewoof/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_grumblewoof/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900b6ca18876f778baa8a"
        },
        "nome": "Disassembled C-3PO",
        "descrition": "Fluent in over six million forms of communication.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_guineapig/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_guineapig/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_guineapig/featured.png"
        },
        "rarity": {
          "displayValue": "Star Wars Series",
          "backendValue": "EFortRarity::Rare",
          "value": "starwars"
        }
      },
      {
        "id": {
          "$oid": "67c900b7ca18876f778baa8c"
        },
        "nome": "Bubbly Blowpack",
        "descrition": "Stretchy storage to go.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_gumoutlaw/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_gumoutlaw/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_gumoutlaw/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900bcca18876f778baa96"
        },
        "nome": "Mom's Spaghetti",
        "descrition": "Great on your plate. Better on your sweater.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_heavyroarcarton/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_heavyroarcarton/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_heavyroarcarton/featured.png"
        },
        "rarity": {
          "displayValue": "Icon Series",
          "backendValue": "EFortRarity::Epic",
          "value": "icon"
        }
      },
      {
        "id": {
          "$oid": "67c900bdca18876f778baa97"
        },
        "nome": "Cash Stash",
        "descrition": "Take the loot and scoot.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_heistsleek/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_heistsleek/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_heistsleek/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900c2ca18876f778baaa5"
        },
        "nome": "Top Trophy",
        "descrition": "Show off that win!",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_impulse/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_impulse/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_impulse/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900c5ca18876f778baaad"
        },
        "nome": "Vector Shroud",
        "descrition": "A prototype that has yet to be replicated.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_ionvial/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_ionvial/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_ionvial/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900caca18876f778baab8"
        },
        "nome": "Champion's Total",
        "descrition": "The number just keeps going up.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_jumbotrons22/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_jumbotrons22/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_jumbotrons22/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c900caca18876f778baab9"
        },
        "nome": "Final Count",
        "descrition": "Down for the count.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_jumbotrons23/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_jumbotrons23/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_jumbotrons23/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c900caca18876f778baaba"
        },
        "nome": "Tracker's Tally",
        "descrition": "Keep track of your settled scores.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_jumbotrons31/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_jumbotrons31/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_jumbotrons31/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c900ceca18876f778baac0"
        },
        "nome": "Multi-Purpose Phone",
        "descrition": "A telephone connecting with The Bebop Crew.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_kneelens/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_kneelens/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_kneelens/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900d5ca18876f778baada"
        },
        "nome": "Shot Rock Tote",
        "descrition": "In a hurry to sweep the competition.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_lunargum/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_lunargum/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_lunargum/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900ddca18876f778baaf0"
        },
        "nome": "The Polychrome",
        "descrition": "Happiness in every hue.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_mochiwoof/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_mochiwoof/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_mochiwoof/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900deca18876f778baaf1"
        },
        "nome": "Moon's Eye",
        "descrition": "Follow the cycle.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_moonsatellite/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_moonsatellite/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_moonsatellite/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900e1ca18876f778baafd"
        },
        "nome": "Thunder Spear Flier",
        "descrition": "Soar above the Titan threat.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_nighthawkmetal/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_nighthawkmetal/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_nighthawkmetal/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c900e2ca18876f778baafe"
        },
        "nome": "Regiment Cloak",
        "descrition": "Represent your regiment with pride.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_nighthawksolo/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_nighthawksolo/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_nighthawksolo/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900e8ca18876f778bab0b"
        },
        "nome": "Skibidi Toilet",
        "descrition": "You know it. Now wear it.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_pagetruffle/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_pagetruffle/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_pagetruffle/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900eaca18876f778bab11"
        },
        "nome": "Spiked Vault",
        "descrition": "Lock up your luxuries.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_partygold/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_partygold/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_partygold/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900eeca18876f778bab1b"
        },
        "nome": "8-bit Champions",
        "descrition": "Pack some pixel power.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_pencilcherry/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_pencilcherry/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_pencilcherry/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900eeca18876f778bab1c"
        },
        "nome": "Season Signature II",
        "descrition": "Show off your winning season... again.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_pennantseasonstide/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_pennantseasonstide/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_pennantseasonstide/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900eeca18876f778bab1d"
        },
        "nome": "Billie's Crown",
        "descrition": "One by one.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_phonecharger/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_phonecharger/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_phonecharger/featured.png"
        },
        "rarity": {
          "displayValue": "Icon Series",
          "backendValue": "EFortRarity::Rare",
          "value": "icon"
        }
      },
      {
        "id": {
          "$oid": "67c900f4ca18876f778bab2f"
        },
        "nome": "The Duke Classic",
        "descrition": "Haute and ready.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_pointwoof/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_pointwoof/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_pointwoof/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900fdca18876f778bab48"
        },
        "nome": "Hero Half-Shell",
        "descrition": "Rep your favorite Ninja's colors.\r\n\r\nHidden when equipped on Ninja Turtles Outfits",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_quietpeanutsstaple/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_quietpeanutsstaple/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_quietpeanutsstaple/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c900feca18876f778bab4b"
        },
        "nome": "Skillet's Stix",
        "descrition": "For a truly special 'splosion.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_ragedebris/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_ragedebris/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_ragedebris/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90104ca18876f778bab5d"
        },
        "nome": "FFC Souvenir Backpack",
        "descrition": "When you're ready to play.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_redoasis/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_redoasis/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_redoasis/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90104ca18876f778bab5f"
        },
        "nome": "Interstellar Butterfly",
        "descrition": "Feel the longing for flight.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_relaystick/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_relaystick/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_relaystick/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90104ca18876f778bab60"
        },
        "nome": "MrDiamond Eyes",
        "descrition": "I've Made 100 Million Friends on This Island!",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_reliableelk/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_reliableelk/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_reliableelk/featured.png"
        },
        "rarity": {
          "displayValue": "Icon Series",
          "backendValue": "EFortRarity::Epic",
          "value": "icon"
        }
      },
      {
        "id": {
          "$oid": "67c9010eca18876f778bab75"
        },
        "nome": "AWR Pack",
        "descrition": "Imperial-issue C-25 grenade pack.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_sagetwig/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_sagetwig/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_sagetwig/featured.png"
        },
        "rarity": {
          "displayValue": "Star Wars Series",
          "backendValue": "EFortRarity::Rare",
          "value": "starwars"
        }
      },
      {
        "id": {
          "$oid": "67c90110ca18876f778bab7b"
        },
        "nome": "Swift Blade Sheathpack",
        "descrition": "Always on edge.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_scalybutcher/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_scalybutcher/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_scalybutcher/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c9011bca18876f778bab95"
        },
        "nome": "Kōji's Roadpack",
        "descrition": "Exhaust your foes.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_sleekrivet/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_sleekrivet/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_sleekrivet/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c9011cca18876f778bab98"
        },
        "nome": "Field Kit",
        "descrition": "Hi-vis kit pack.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_slimytune/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_slimytune/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_slimytune/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90125ca18876f778babb0"
        },
        "nome": "Jack's Compass",
        "descrition": "Find your horizon.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_springbreak/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_springbreak/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_springbreak/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90125ca18876f778babb1"
        },
        "nome": "Skull and Crossed Swords",
        "descrition": "Never turn your back on the jolly roger.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_springbreakstraw/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_springbreakstraw/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_springbreakstraw/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c9012bca18876f778babc3"
        },
        "nome": "Roses For Julia",
        "descrition": "Say goodbye with flowers.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_studybench/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_studybench/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_studybench/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90133ca18876f778babd5"
        },
        "nome": "Shockball",
        "descrition": "Unbearably cute road buddy.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_tacticalonyx/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_tacticalonyx/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_tacticalonyx/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90134ca18876f778babd6"
        },
        "nome": "Tactical Satchel",
        "descrition": "Munitions on the go.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_tactickale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_tactickale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_tactickale/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90136ca18876f778babda"
        },
        "nome": "Yoki Tote",
        "descrition": "Protected by the most cheerful cursed oni mask you'll ever meet.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_tearscar/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_tearscar/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_tearscar/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90138ca18876f778babde"
        },
        "nome": "Flightalis' Flight Pack",
        "descrition": "Fight and flight.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_thickwatch/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_thickwatch/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_thickwatch/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c9013cca18876f778babea"
        },
        "nome": "Shark",
        "descrition": "The best friend to have in battle.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_timesquarebite/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_timesquarebite/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_timesquarebite/featured.png"
        },
        "rarity": {
          "displayValue": "Icon Series",
          "backendValue": "EFortRarity::Rare",
          "value": "icon"
        }
      },
      {
        "id": {
          "$oid": "67c90141ca18876f778babfa"
        },
        "nome": "Adid-a-lotl Backpack",
        "descrition": "He's hungry to hold your stuff.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_upbeatiguana/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_upbeatiguana/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_upbeatiguana/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90147ca18876f778bac0b"
        },
        "nome": "Thunder Dragon Scroll",
        "descrition": "Sign of the storm.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_wavetrail/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_wavetrail/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_wavetrail/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90148ca18876f778bac0e"
        },
        "nome": "Yoda",
        "descrition": "Legendary Jedi Master.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_wideplane/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_wideplane/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_wideplane/featured.png"
        },
        "rarity": {
          "displayValue": "Star Wars Series",
          "backendValue": "EFortRarity::Rare",
          "value": "starwars"
        }
      },
      {
        "id": {
          "$oid": "67c90149ca18876f778bac10"
        },
        "nome": "Hard-Won Treasure",
        "descrition": "A champion's coin cache.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/backpack_winterhunterfncs/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/backpack_winterhunterfncs/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/backpack_winterhunterfncs/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90179ca18876f778bac97"
        },
        "nome": "Brite Bag",
        "descrition": "Don't forget to pack a smile!",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_026_brite/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_026_brite/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_026_brite/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c9017dca18876f778baca0"
        },
        "nome": "Buckler",
        "descrition": "A battle-tested shield.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_035_scathach/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_035_scathach/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_035_scathach/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c9017eca18876f778baca2"
        },
        "nome": "Hard Boiled",
        "descrition": "Dipped & dyed.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_037_bunnymale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_037_bunnymale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_037_bunnymale/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c90180ca18876f778baca6"
        },
        "nome": "Hatchling",
        "descrition": "Clever bag.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_041_pajamaparty/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_041_pajamaparty/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_041_pajamaparty/featured.png"
        },
        "rarity": {
          "displayValue": "Legendary",
          "backendValue": "EFortRarity::Legendary",
          "value": "legendary"
        }
      },
      {
        "id": {
          "$oid": "67c90185ca18876f778bacb4"
        },
        "nome": "Bogey Bag",
        "descrition": "You've got a bogey on your six.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_056_fighterpilot/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_056_fighterpilot/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_056_fighterpilot/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c901c0ca18876f778bad54"
        },
        "nome": "Haystacks",
        "descrition": "Characteristically unfriendly to birds.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_219_farmermale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_219_farmermale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_219_farmermale/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c901c1ca18876f778bad55"
        },
        "nome": "Sun Sprout",
        "descrition": "Perfectly sunny.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_220_farmerfemale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_220_farmerfemale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_220_farmerfemale/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c901c7ca18876f778bad61"
        },
        "nome": "Lucky Coins",
        "descrition": "Save up your luck.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_232_leprechaun/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_232_leprechaun/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_232_leprechaun/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c901ddca18876f778bad96"
        },
        "nome": "Banner Cape",
        "descrition": "Customize your look by choosing a Banner and color in your Locker.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_289_banner/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_289_banner/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_289_banner/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c901e2ca18876f778bada6"
        },
        "nome": "Brave Bag",
        "descrition": "Brave and blue.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_305_starandstripesfemale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_305_starandstripesfemale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_305_starandstripesfemale/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c901e3ca18876f778bada7"
        },
        "nome": "Color Guard",
        "descrition": "Forever bold.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_306_starandstripesmale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_306_starandstripesmale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_306_starandstripesmale/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c901eaca18876f778badbc"
        },
        "nome": "Rift Rock",
        "descrition": "Back from beyond.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_327_meteorite/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_327_meteorite/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_327_meteorite/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c901ebca18876f778badbe"
        },
        "nome": "Grande Pack",
        "descrition": "River ready.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_329_wildwestfemale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_329_wildwestfemale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_329_wildwestfemale/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c901edca18876f778badc3"
        },
        "nome": "Banner Shield",
        "descrition": "Customize your look by choosing a Banner and color in your Locker.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_334_bannermale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_334_bannermale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_334_bannermale/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c901f4ca18876f778badd3"
        },
        "nome": "Motocase",
        "descrition": "Built for speed.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_350_tacticalbiker/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_350_tacticalbiker/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_350_tacticalbiker/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c901faca18876f778bade1"
        },
        "nome": "Llamacorn Shield",
        "descrition": "A mighty sigil.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_364_llamahero/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_364_llamahero/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_364_llamahero/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c90204ca18876f778bae00"
        },
        "nome": "Back-o-lantern",
        "descrition": "Share a spooky smile.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_396_raptorglow/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_396_raptorglow/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_396_raptorglow/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c90206ca18876f778bae04"
        },
        "nome": "Grinning Ghoul",
        "descrition": "Gleaming grill included.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_400_halloweenalt/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_400_halloweenalt/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_400_halloweenalt/featured.png"
        },
        "rarity": {
          "displayValue": "Rare",
          "backendValue": "EFortRarity::Rare",
          "value": "rare"
        }
      },
      {
        "id": {
          "$oid": "67c90212ca18876f778bae2b"
        },
        "nome": "Yule Breakers",
        "descrition": "Open the door to the holidays.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_441_holidaypj/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_441_holidaypj/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_441_holidaypj/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90213ca18876f778bae2e"
        },
        "nome": "Holiday Hydrant",
        "descrition": "Relief wrapped in a bow.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_444_festivepug/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_444_festivepug/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_444_festivepug/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90218ca18876f778bae37"
        },
        "nome": "Contender",
        "descrition": "Bring your best to be the best.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_453_frogmanfemale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_453_frogmanfemale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_453_frogmanfemale/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c9021aca18876f778bae3d"
        },
        "nome": "Hurricane",
        "descrition": "Add a little danger to your tropical adventure.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_459_codsquad_hoodie/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_459_codsquad_hoodie/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_459_codsquad_hoodie/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c9021cca18876f778bae46"
        },
        "nome": "Neon Wings",
        "descrition": "Glow above and beyond.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_469_wings/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_469_wings/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_469_wings/featured.png"
        },
        "rarity": {
          "displayValue": "Epic",
          "backendValue": "EFortRarity::Epic",
          "value": "epic"
        }
      },
      {
        "id": {
          "$oid": "67c90220ca18876f778bae55"
        },
        "nome": "Doggie Bag",
        "descrition": "Take it to go.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_484_pugmilitia/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_484_pugmilitia/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_484_pugmilitia/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90220ca18876f778bae57"
        },
        "nome": "Gold Chain",
        "descrition": "If it fits...",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_486_winterhuntermale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_486_winterhuntermale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_486_winterhuntermale/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90221ca18876f778bae58"
        },
        "nome": "Goldy Lock",
        "descrition": "Just right.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_487_winterhunterfemale/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_487_winterhunterfemale/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_487_winterhunterfemale/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      },
      {
        "id": {
          "$oid": "67c90221ca18876f778bae59"
        },
        "nome": "Lucky Clover",
        "descrition": "Pack a little luck.",
        "images": {
          "icon": "https://fortnite-api.com/images/cosmetics/br/bid_488_luckyhero/icon.png",
          "smallIcon": "https://fortnite-api.com/images/cosmetics/br/bid_488_luckyhero/smallicon.png",
          "featured": "https://fortnite-api.com/images/cosmetics/br/bid_488_luckyhero/featured.png"
        },
        "rarity": {
          "displayValue": "Uncommon",
          "backendValue": "EFortRarity::Uncommon",
          "value": "uncommon"
        }
      }
    ]
  }

export function GameView ({ game, fetchGames }: { game: GameItemProps, fetchGames: () => void }) {
    const renderImages = (objectFit: string ) => <><Box
        component="img"
        alt={game.name}
        src={game.photoBlackBackground}
        sx={{
        width: '32%',
        height: 200,
        objectFit,
        padding: 0.5
        }}
    />
    <Box
        component="img"
        alt={game.name}
        src={game.photoNoBackground}
        sx={{
        width: '32%',
        height: 200,
        objectFit,
        padding: 0.5
        }}
    />
    <Box
        component="img"
        alt={game.name}
        src={game.photoWhiteBackground}
        sx={{
        width: '32%',
        height: 200,
        objectFit,
        padding: 0.5
        }}
    /></>

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };
    
    const renderTabContent = () => {
        switch (tabIndex) {
            case 0:
                return (
                    <Box p={3}>
                        <Typography variant="h6">Details</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Imagens
                        </Typography>
                    </Box>
                );
            case 1:
                return (
                    <Box p={3}>
                        <Typography variant="h6">Attributes</Typography>
                        <PhotoGallery data={data}  />
                    </Box>
                );
            case 2:
                return (
                    <Box p={3}>
                        <Typography variant="h6">Cosmetics</Typography>
                        <PhotoGallery data={data2}  />
                    </Box>
                );            
            default:
                return null;
        }
    };
    // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setTabIndex(newValue);
    // };

    const token = useAppSelector((state) => state.auth.token);
    const submitAttributs = async (event: any) => {
    
        event.preventDefault();
          const formData = new FormData(event.currentTarget);
    
          const imageBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            const imageFile = formData.get('image') as Blob | null;
            if (imageFile) {
              reader.readAsDataURL(imageFile);
            } else {
              reject(new Error('No image file selected'));
            }
          });
    
          const newAttribute = {
            name: formData.get('name'),
            value: formData.get('value'),
            image: imageBase64,
          };
          // game.atributs.push(newAttribute);
          
          const response = await fetch(`${CONFIG.urlUsers}/games/${game.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAttribute)
          });
          if(response.ok){
            fetchGames();
          }
    
        }
    return <><Link onClick={handleOpen} variant="h6">{game.name}</Link>
    <Drawer anchor="bottom" open={open} onClose={handleClose} PaperProps={{ style: { height: '100vh' } }}>
      <Button onClick={handleClose} style={{ position: 'absolute', top: 10, right: 10 }}>exit</Button>
      <Box p={2} width="100vw">
        <Typography variant="h6">{game.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {game.category}
        </Typography>
        


    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Box>
     <Tabs value={tabIndex} onChange={handleTabChange} aria-label="game tabs">
          <Tab label="Details" />
          <Tab label="Wrap" />
          <Tab label="Backpack" />
     </Tabs>
       {renderTabContent()}
    </Box>
    </Box>
        <Box role="tabpanel" hidden={tabIndex !== 0} id="tabpanel-0" aria-labelledby="tab-0">
            {tabIndex === 0 && (
                <Box>
                    <Box display="flex" justifyContent="space-between">
                        {renderImages('contain')}
                    </Box>
                    <Box p={3}>
                        <Box mt={2} display="flex" gap={2}>
                            {game.attributs.attributs && game.attributs.attributs.map((attribut: any) => (
                                <Box key={attribut.name} display="flex" flexDirection="column" gap={2}>
                                    <Typography>{attribut.name}: {attribut.value}</Typography>
                                    <img src={attribut.image} alt={attribut.name} style={{width: 200, height: 200}} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <form onSubmit={submitAttributs}>
                        <TextField name="name" label="Name" fullWidth margin="normal" />
                        <TextField name="value" label="Value" fullWidth margin="normal" />
                        <Button variant="contained" component="label">
                            Upload Image
                            <input type="file" name="image" hidden />
                        </Button>
                        <Button sx={{marginTop:"2rem"}} type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </form>
                </Box>

            )}
        </Box>
      </Box>
    </Drawer></>
}