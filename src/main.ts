import {
  collectibleHasTag,
  getCollectibleInitCharges,
  getCollectibleQuality,
  getCollectibleSet,
  getRandomArrayElement,
  isPassiveCollectible,
  isQuestCollectible,
} from "isaacscript-common";

const MOD_NAME = "isaac-mehden";

const MEHDEN_MAXIMUM_QUALITY = 0;
const MEHDEN_STARTING_ITEMS: CollectibleType[] = [];
const MEHDEN_ACTIVE_STARTING_ITEMS: CollectibleType[] = [];

const MEHDEN_DAMAGE = -1;
const MEHDEN_FIREDELAY = +4;
const MEHDEN_SHOT_SPEED = -0.25;
const MEHDEN_RANGE = -1.5;
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
    initMehdenStartingItems();
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

function initMehdenStartingItems() {
  const collectibles = getCollectibleSet();

  // Remove quest items and good quality items
  for (const collectibleType of collectibles.values()) {
    if (
      !isQuestCollectible(collectibleType) &&
      getCollectibleQuality(collectibleType) <= MEHDEN_MAXIMUM_QUALITY &&
      !collectibleHasTag(collectibleType, ItemConfigTag.NO_EDEN)
    ) {
      if (isPassiveCollectible(collectibleType)) {
        MEHDEN_STARTING_ITEMS.push(collectibleType);
      } else {
        MEHDEN_ACTIVE_STARTING_ITEMS.push(collectibleType);
      }
    }
  }
}

function getMehdenStartingItem(pool: CollectibleType[], seed: int) {
  return getRandomArrayElement(pool, seed);
}
