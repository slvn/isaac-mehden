import {
  CacheFlag,
  CollectibleType,
  ModCallback,
} from "isaac-typescript-definitions";
import {
  getCollectibleInitCharge,
  getRandomArrayElement,
} from "isaacscript-common";

const MOD_NAME = "isaac-mehden";

const MEHDEN_STARTING_ITEMS: CollectibleType[] = [
  CollectibleType.MOMS_HEELS,
  CollectibleType.DEAD_BIRD,
  CollectibleType.GUPPYS_TAIL,
  CollectibleType.PAGEANT_BOY,
  CollectibleType.INFESTATION,
  CollectibleType.BUM_FRIEND,
  CollectibleType.BLACK_BEAN,
  CollectibleType.ABEL,
  CollectibleType.SHARP_PLUG,
  CollectibleType.TINY_PLANET,
  CollectibleType.E_COLI,
  CollectibleType.LITTLE_BAGGY,
  CollectibleType.MISSING_NO,
  CollectibleType.BBF,
  CollectibleType.BOBS_BRAIN,
  CollectibleType.ISAACS_HEART,
  CollectibleType.TAURUS,
  CollectibleType.CURSED_EYE,
  CollectibleType.LUDOVICO_TECHNIQUE,
  CollectibleType.SOY_MILK,
  CollectibleType.BROKEN_WATCH,
  CollectibleType.THE_WIZ,
  CollectibleType.CURSE_OF_THE_TOWER,
  CollectibleType.RESTOCK,
  CollectibleType.LIL_GURDY,
  CollectibleType.KEY_BUM,
  CollectibleType.BETRAYAL,
  CollectibleType.MARKED,
  CollectibleType.GODS_FLESH,
  CollectibleType.MY_SHADOW,
  CollectibleType.LINGER_BEAN,
  CollectibleType.SHARD_OF_GLASS,
  CollectibleType.VARICOSE_VEINS,
  CollectibleType.GLAUCOMA,
  CollectibleType.SHADE,
  CollectibleType.HUSHY,
  CollectibleType.CAMO_UNDIES,
  CollectibleType.LEPROSY,
  CollectibleType.POP,
  CollectibleType.SCHOOLBAG,
  CollectibleType.MYSTERY_EGG,
  CollectibleType.ALMOND_MILK,
  CollectibleType.VOODOO_HEAD,
  CollectibleType.BIRD_CAGE,
  CollectibleType.FOUR_FIVE_VOLT,
  CollectibleType.POUND_OF_FLESH,
  CollectibleType.CRACKED_ORB,
  CollectibleType.EMPTY_HEART,
  CollectibleType.LIL_PORTAL,
  CollectibleType.VANISHING_TWIN,
  CollectibleType.IBS,
];
const MEHDEN_ACTIVE_STARTING_ITEMS: CollectibleType[] = [
  CollectibleType.POOP,
  CollectibleType.MOMS_BRA,
  CollectibleType.KAMIKAZE,
  CollectibleType.MOMS_PAD,
  CollectibleType.LEMON_MISHAP,
  CollectibleType.BEAN,
  CollectibleType.RAZOR_BLADE,
  CollectibleType.IV_BAG,
  CollectibleType.PORTABLE_SLOT,
  CollectibleType.FLUSH,
  CollectibleType.BUTTER_BEAN,
  CollectibleType.MAGIC_FINGERS,
  CollectibleType.CONVERTER,
  CollectibleType.SCISSORS,
  CollectibleType.BREATH_OF_LIFE,
  CollectibleType.WOODEN_NICKEL,
  CollectibleType.D12,
  CollectibleType.KIDNEY_BEAN,
  CollectibleType.D7,
  CollectibleType.BROKEN_GLASS_CANNON,
  CollectibleType.PLAN_C,
  CollectibleType.PAUSE,
  CollectibleType.DATAMINER,
  CollectibleType.DULL_RAZOR,
  CollectibleType.POTATO_PEELER,
  CollectibleType.BROWN_NUGGET,
  CollectibleType.DELIRIOUS,
  CollectibleType.MOVING_BOX,
  CollectibleType.SACRIFICIAL_ALTAR,
  CollectibleType.DAMOCLES,
  CollectibleType.MEAT_CLEAVER,
  CollectibleType.SPIN_TO_WIN,
];

const MEHDEN_DAMAGE = -1;
const MEHDEN_FIRE_DELAY = +6;
const MEHDEN_SHOT_SPEED = -0.25;
const MEHDEN_RANGE = -60;
const MEHDEN_SPEED = -0.15;
const MEHDEN_LUCK = -1;

export function main(): void {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events
  const mod = RegisterMod(MOD_NAME, 1);

  // Set a callback function that corresponds to when a new run is started
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);

  mod.AddCallback(ModCallback.EVALUATE_CACHE, evaluateCache);

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
      getCollectibleInitCharge(activeItem),
    );
  }
}

function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag) {
  if (Isaac.GetPlayer().GetName() === "Mehden") {
    if (cacheFlag === CacheFlag.DAMAGE) {
      player.Damage += MEHDEN_DAMAGE;
    }
    if (cacheFlag === CacheFlag.FIRE_DELAY) {
      player.MaxFireDelay += MEHDEN_FIRE_DELAY;
    }
    if (cacheFlag === CacheFlag.SHOT_SPEED) {
      player.ShotSpeed += MEHDEN_SHOT_SPEED;
    }
    if (cacheFlag === CacheFlag.RANGE) {
      player.TearRange += MEHDEN_RANGE;
    }
    if (cacheFlag === CacheFlag.SPEED) {
      player.MoveSpeed += MEHDEN_SPEED;
    }
    if (cacheFlag === CacheFlag.LUCK) {
      player.Luck += MEHDEN_LUCK;
    }
  }
}

function getMehdenStartingItem(pool: CollectibleType[], seed: Seed) {
  return getRandomArrayElement(pool, seed);
}
