import Item from '../../models/itemModel';
import Pack from '../../models/packModel';

/**
 * Adds a global item to the pack service.
 *
 * @param {string} packId - The ID of the pack.
 * @param {string} itemId - The ID of the item.
 * @param {string} ownerId - The ID of the owner.
 * @return {Promise<object>} - A promise that resolves to the added item.
 */
export const addGlobalItemToPackService = async (packId, itemId, ownerId) => {
  const item = await Item.findById(itemId).populate('category', 'name');

  await Pack.updateOne({ _id: packId }, { $addToSet: { items: item._id } });

  await Item.findByIdAndUpdate(
    item._id,
    {
      $addToSet: {
        owners: ownerId,
      },
    },
    { new: true },
  );

  await Item.findByIdAndUpdate(
    item._id,
    {
      $addToSet: {
        packs: packId,
      },
    },
    { new: true },
  );

  return item;
};
