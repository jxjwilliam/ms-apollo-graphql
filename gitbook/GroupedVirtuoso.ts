// ref to: https://virtuoso.dev/
import * as React from 'react'
import { ReactElement } from 'react'
import { TScrollLocation } from './EngineCommons'
import { VirtuosoProps } from './Virtuoso'
export interface GroupedVirtuosoMethods {
	scrollToIndex(location: TScrollLocation): void
}
export declare const GroupedVirtuoso: React.ForwardRefExoticComponent<
	Pick<
		VirtuosoProps,
		| 'overscan'
		| 'header'
		| 'footer'
		| 'computeItemKey'
		| 'prependItemCount'
		| 'itemHeight'
		| 'defaultItemHeight'
		| 'startReached'
		| 'endReached'
		| 'scrollingStateChange'
		| 'atBottomStateChange'
		| 'itemsRendered'
		| 'rangeChanged'
		| 'totalListHeightChanged'
		| 'style'
		| 'dataKey'
		| 'className'
		| 'initialItemCount'
		| 'initialTopMostItemIndex'
		| 'followOutput'
		| 'ScrollContainer'
		| 'HeaderContainer'
		| 'FooterContainer'
		| 'ListContainer'
		| 'ItemContainer'
		| 'maxHeightCacheSize'
		| 'scrollSeek'
	> & {
		groupCounts: number[]
		group: (groupIndex: number) => ReactElement
		item: (index: number, groupIndex?: number | undefined) => ReactElement
		groupIndices?: ((indices: number[]) => void) | undefined
		GroupContainer?:
			| React.FC<Pick<import('./VirtuosoList').TRenderProps, 'style' | 'key' | 'data-index' | 'data-known-size'>>
			| undefined
	} & React.RefAttributes<GroupedVirtuosoMethods>
>
