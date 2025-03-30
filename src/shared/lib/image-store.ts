import { Categories } from "../types/categories";

interface IImageStore {
  [Categories.Digimon]: {
    art: Record<string, string>;
    icon: Record<string, string>;
  };
  [Categories.Digitama]: {
    art: Record<string, string>;
    icon: Record<string, string>;
  };
  [Categories.Item]: {
    art: Record<string, string>;
    icon: Record<string, string>;
  };
}

const ImageStore: IImageStore = {
  digimon: {
    art: {
      default: "/images/digimon/art/default.webp",
      agumon: "/images/digimon/art/agumon.webp",
      agumon_black: "/images/digimon/art/agumon-black.webp",
      yuki_agumon: "/images/digimon/art/yuki-agumon.webp",
      kokuwamon: "/images/digimon/art/kokuwamon.webp",
      greymon: "/images/digimon/art/greymon.webp",
      tyranomon: "/images/digimon/art/tyranomon.webp",
    },
    icon: {
      aero_v_dramon: "/images/digimon/icon/aero-v-dramon.webp",
      agumon_black: "/images/digimon/icon/agumon-black.webp",
      agumon: "/images/digimon/icon/agumon.webp",
      andromon: "/images/digimon/icon/andromon.webp",
      big_mamemon: "/images/digimon/icon/big-mamemon.webp",
      blacktyranomon: "/images/digimon/icon/blacktyranomon.webp",
      etemon: "/images/digimon/icon/etemon.webp",
      geo_greymon: "/images/digimon/icon/geo-greymon.webp",
      geremon: "/images/digimon/icon/geremon.webp",
      giga_warumonsaemon: "/images/digimon/icon/giga-warumonsaemon.webp",
      gold_numemon: "/images/digimon/icon/gold-numemon.webp",
      karatuki_numemon: "/images/digimon/icon/karatuki-numemon.webp",
      kokuwamon: "/images/digimon/icon/kokuwamon.webp",
      mamemon: "/images/digimon/icon/mamemon.webp",
      mametyrano: "/images/digimon/icon/mametyrano.webp",
      metal_greymon_vaccine:
        "/images/digimon/icon/metal-greymon-vaccine.webp",
      metal_greymon: "/images/digimon/icon/metal-greymon.webp",
      metal_mamemon: "/images/digimon/icon/metal-mamemon.webp",
      monzaemon: "/images/digimon/icon/monzaemon.webp",
      numemon: "/images/digimon/icon/numemon.webp",
      pillowmon: "/images/digimon/icon/pillowmon.webp",
      platinium_numemon: "/images/digimon/icon/platinium-numemon.webp",
      rizegreymon: "/images/digimon/icon/rizegreymon.webp",
      starmon: "/images/digimon/icon/starmon.webp",
      sukamon: "/images/digimon/icon/sukamon.webp",
      tekkamon: "/images/digimon/icon/tekkamon.webp",
      tyranomon: "/images/digimon/icon/tyranomon.webp",
      v_dramon_black: "/images/digimon/icon/v-dramon-black.webp",
      v_dramon: "/images/digimon/icon/v-dramon.webp",
      waru_monzaemon: "/images/digimon/icon/waru-monzaemon.webp",
      yuki_agumon: "/images/digimon/icon/yuki-agumon.webp",
      yukidarumon: "/images/digimon/icon/yukidarumon.webp",
    },
  },
  digitama: {
    art: {
      devices_and_dragons: "/images/digitama/art/devices-and-dragons.webp",
    },
    icon:{

    }
  },
  item:{
    art: {
    },
    icon:{
    }
  }
};

export default ImageStore;
