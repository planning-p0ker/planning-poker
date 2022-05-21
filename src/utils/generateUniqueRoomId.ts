// https://qiita.com/coa00/items/679b0b5c7c468698d53f
export function generateUniqueRoomId(): string {
  let strong = 1000;
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
}
