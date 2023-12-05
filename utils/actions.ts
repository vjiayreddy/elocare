import _ from "lodash";
import { QUESTION_TYPES_OPTIONS } from "./constants";

export const shouldForwardProp = <CustomProps extends Record<string, any>>(
  props: Array<keyof CustomProps>,
  prop: PropertyKey
): boolean => !props.includes(prop as string);

export const handleEmojiRating = (
  checkedId: any,
  fieldName: string,
  getValues: any
) => {
  const { [`${fieldName}`]: ids } = getValues();
  const newIds = ids?.includes(checkedId)
    ? ids?.filter((id: any) => id !== checkedId)
    : [...(ids ?? []), checkedId];
  return newIds;
};

export const stringReplaceWithWhiteSpace = (
  value: string,
  replaceWith: string
) => {
  const newValue = value.toLowerCase().replace(/\s/g, replaceWith);
  return newValue;
};

export const filterResponseType = (responseType: string[]) => {
  let responseTypes: any[] = [];
  responseType.map((_item: string) => {
    const _findResponse = _.find(
      QUESTION_TYPES_OPTIONS,
      (item) => item?.value === _item
    );
    if (_findResponse) {
      responseTypes.push(_findResponse);
    }
  });
  return responseTypes;
};
