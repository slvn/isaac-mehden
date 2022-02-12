import {
  getCollectibleInitCharges,
  getRandomArrayElement,
} from "isaacscript-common";

const MOD_NAME = "isaac-mehden";

const MEHDEN_STARTING_ITEMS: CollectibleType[] = [
  CollectibleType.COLLECTIBLE_MOMS_HEELS,
  CollectibleType.COLLECTIBLE_DEAD_BIRD,
  CollectibleType.COLLECTIBLE_GUPPYS_TAIL,
  CollectibleType.COLLECTIBLE_PAGEANT_BOY,
  CollectibleType.COLLECTIBLE_INFESTATION,
  CollectibleType.COLLECTIBLE_BUM_FRIEND,
  CollectibleType.COLLECTIBLE_BLACK_BEAN,
  CollectibleType.COLLECTIBLE_ABEL,
  CollectibleType.COLLECTIBLE_SHARP_PLUG,
  CollectibleType.COLLECTIBLE_TINY_PLANET,
  CollectibleType.COLLECTIBLE_E_COLI,
  CollectibleType.COLLECTIBLE_LITTLE_BAGGY,
  CollectibleType.COLLECTIBLE_MISSING_NO,
  CollectibleType.COLLECTIBLE_BBF,
  CollectibleType.COLLECTIBLE_BOBS_BRAIN,
  CollectibleType.COLLECTIBLE_ISAACS_HEART,
  CollectibleType.COLLECTIBLE_CURSED_EYE,
  CollectibleType.COLLECTIBLE_LUDOVICO_TECHNIQUE,
  CollectibleType.COLLECTIBLE_SOY_MILK,
  CollectibleType.COLLECTIBLE_BROKEN_WATCH,
  CollectibleType.COLLECTIBLE_THE_WIZ,
  CollectibleType.COLLECTIBLE_LOST_FLY,
  CollectibleType.COLLECTIBLE_CURSE_OF_THE_TOWER,
  CollectibleType.COLLECTIBLE_RESTOCK,
  CollectibleType.COLLECTIBLE_LIL_GURDY,
  CollectibleType.COLLECTIBLE_KEY_BUM,
  CollectibleType.COLLECTIBLE_BETRAYAL,
  CollectibleType.COLLECTIBLE_MARKED,
  CollectibleType.COLLECTIBLE_GODS_FLESH,
  CollectibleType.COLLECTIBLE_MY_SHADOW,
  CollectibleType.COLLECTIBLE_LINGER_BEAN,
  CollectibleType.COLLECTIBLE_SHARD_OF_GLASS,
  CollectibleType.COLLECTIBLE_VARICOSE_VEINS,
  CollectibleType.COLLECTIBLE_GLAUCOMA,
  CollectibleType.COLLECTIBLE_SHADE,
  CollectibleType.COLLECTIBLE_HUSHY,
  CollectibleType.COLLECTIBLE_CAMO_UNDIES,
  CollectibleType.COLLECTIBLE_BACKSTABBER,
  CollectibleType.COLLECTIBLE_MOMS_RAZOR,
  CollectibleType.COLLECTIBLE_LEPROSY,
  CollectibleType.COLLECTIBLE_POP,
  CollectibleType.COLLECTIBLE_SCHOOLBAG,
  CollectibleType.COLLECTIBLE_MYSTERY_EGG,
  CollectibleType.COLLECTIBLE_ALMOND_MILK,
  CollectibleType.COLLECTIBLE_VOODOO_HEAD,
  CollectibleType.COLLECTIBLE_BIRD_CAGE,
  CollectibleType.COLLECTIBLE_LIL_DUMPY,
  CollectibleType.COLLECTIBLE_4_5_VOLT,
  CollectibleType.COLLECTIBLE_POUND_OF_FLESH,
  CollectibleType.COLLECTIBLE_CRACKED_ORB,
  CollectibleType.COLLECTIBLE_EMPTY_HEART,
  CollectibleType.COLLECTIBLE_LIL_PORTAL,
  CollectibleType.COLLECTIBLE_JELLY_BELLY,
  CollectibleType.COLLECTIBLE_VANISHING_TWIN,
  CollectibleType.COLLECTIBLE_IBS,
];
const MEHDEN_ACTIVE_STARTING_ITEMS: CollectibleType[] = [
  CollectibleType.COLLECTIBLE_POOP,
  CollectibleType.COLLECTIBLE_MOMS_BRA,
  CollectibleType.COLLECTIBLE_KAMIKAZE,
  CollectibleType.COLLECTIBLE_MOMS_PAD,
  CollectibleType.COLLECTIBLE_LEMON_MISHAP,
  CollectibleType.COLLECTIBLE_BEAN,
  CollectibleType.COLLECTIBLE_RAZOR_BLADE,
  CollectibleType.COLLECTIBLE_IV_BAG,
  CollectibleType.COLLECTIBLE_PORTABLE_SLOT,
  CollectibleType.COLLECTIBLE_FLUSH,
  CollectibleType.COLLECTIBLE_BUTTER_BEAN,
  CollectibleType.COLLECTIBLE_MAGIC_FINGERS,
  CollectibleType.COLLECTIBLE_CONVERTER,
  CollectibleType.COLLECTIBLE_SCISSORS,
  CollectibleType.COLLECTIBLE_BREATH_OF_LIFE,
  CollectibleType.COLLECTIBLE_WOODEN_NICKEL,
  CollectibleType.COLLECTIBLE_D12,
  CollectibleType.COLLECTIBLE_KIDNEY_BEAN,
  CollectibleType.COLLECTIBLE_D7,
  CollectibleType.COLLECTIBLE_BROKEN_GLASS_CANNON,
  CollectibleType.COLLECTIBLE_PLAN_C,
  CollectibleType.COLLECTIBLE_PAUSE,
  CollectibleType.COLLECTIBLE_DATAMINER,
  CollectibleType.COLLECTIBLE_DULL_RAZOR,
  CollectibleType.COLLECTIBLE_POTATO_PEELER,
  CollectibleType.COLLECTIBLE_BROWN_NUGGET,
  CollectibleType.COLLECTIBLE_DELIRIOUS,
  CollectibleType.COLLECTIBLE_MOVING_BOX,
  CollectibleType.COLLECTIBLE_SACRIFICIAL_ALTAR,
  CollectibleType.COLLECTIBLE_DAMOCLES,
  CollectibleType.COLLECTIBLE_MEAT_CLEAVER,
  CollectibleType.COLLECTIBLE_SPIN_TO_WIN,
];

const MEHDEN_DAMAGE = -1;
const MEHDEN_FIREDELAY = +6;
const MEHDEN_SHOT_SPEED = -0.25;
const MEHDEN_RANGE = -60;
const MEHDEN_SPEED = -0.15;
const MEHDEN_LUCK = -1;

export function main(): void {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events
  const mod = RegisterMod(MOD_NAME, 1);

  // Set a callback function that corresponds to when a new run is started
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted);

  mod.AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache);

  // Print an initialization message to the "log.txt" file
  Isaac.DebugString(`${MOD_NAME} initialized.`);
}

function postGameStarted() {
  if (Isaac.GetPlayer().GetName() === "Mehden") {
    const seed = Game().GetSeeds().GetStartSeed();
    const passiveItem = getMehdenStartingItem(MEHDEN_STARTING_ITEMS, seed);
    Isaac.GetPlayer().AddCollectible(passiveItem);
    const activeItem = getMehdenStartingItem(
      MEHDEN_ACTIVE_STARTING_ITEMS,
      seed,
    );
    Isaac.GetPlayer().AddCollectible(
      activeItem,
      getCollectibleInitCharges(activeItem),
    );
  }
}

function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag) {
  if (Isaac.GetPlayer().GetName() === "Mehden") {
    if (cacheFlag === CacheFlag.CACHE_DAMAGE) {
      player.Damage += MEHDEN_DAMAGE;
    }
    if (cacheFlag === CacheFlag.CACHE_FIREDELAY) {
      player.MaxFireDelay += MEHDEN_FIREDELAY;
    }
    if (cacheFlag === CacheFlag.CACHE_SHOTSPEED) {
      player.ShotSpeed += MEHDEN_SHOT_SPEED;
    }
    if (cacheFlag === CacheFlag.CACHE_RANGE) {
      player.TearRange += MEHDEN_RANGE;
    }
    if (cacheFlag === CacheFlag.CACHE_SPEED) {
      player.MoveSpeed += MEHDEN_SPEED;
    }
    if (cacheFlag === CacheFlag.CACHE_LUCK) {
      player.Luck += MEHDEN_LUCK;
    }
  }
}

function getMehdenStartingItem(pool: CollectibleType[], seed: int) {
  return getRandomArrayElement(pool, seed);
}
