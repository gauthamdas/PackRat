import { publicProcedure } from '../../trpc';
import { UnableToScorePackError } from '../../helpers/errors';
import { scorePackService } from '../../services/pack/pack.service';
import * as validator from '../../middleware/validators/index';
/**
 * Scores a pack by calculating its score and updating the pack object in the database.
 * @param {Object} req - The request object containing the packId parameter.
 * @param {Object} res - The response object used to send the response.
 * @return {Promise} A promise that resolves to the updated pack object or an error message.
 */
export const scorePack = async (req, res, next) => {
  try {
    const { packId } = req.params;

    const updatedPack = await scorePackService(packId);

    res.status(200).json({ msg: 'Pack was scored successfully', updatedPack });
  } catch (error) {
    next(UnableToScorePackError);
  }
};

export function scorePackRoute() {
  return publicProcedure.input(validator.getPackById).mutation(async (opts) => {
    const { packId } = opts.input;
    return await scorePackService(packId);
  });
}
