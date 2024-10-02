import { z } from 'zod'

import { ImageBackground } from './_/Image'
import { LinesBackground } from './_/Lines'
import { RealEstateBackground } from './_/RealEstate'
import { SquaresBackground } from './_/Squares'
import { StaticBackground } from './_/Static'
import { LampedCrosses } from './_/LampedCrosses'


export const BACKGROUNDS = [
  // Add new background here
  LinesBackground,
  SquaresBackground,
  ImageBackground,
  StaticBackground,
  RealEstateBackground,
  LampedCrosses
]

type BackgroundSchema = (typeof BACKGROUNDS)[number]['schema']
export const BackgroundProps = z.discriminatedUnion(
  'type',
  BACKGROUNDS.map((bg) => bg.schema) as [BackgroundSchema, ...BackgroundSchema[]],
)
export type BackgroundProps = z.infer<typeof BackgroundProps>
