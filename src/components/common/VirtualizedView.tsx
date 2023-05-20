import React from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import moment from "moment";

interface Props {
  children: JSX.Element | JSX.Element[] | React.ReactChildren;
  onScroll?:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | undefined;
}

export default function VirtualizedView(props: Props) {
  return (
    <FlatList
      onScroll={props.onScroll}
      {...props}
      nestedScrollEnabled
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => moment().valueOf().toString()}
      renderItem={null}
      ListHeaderComponent={() => <>{props.children}</>}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
}
