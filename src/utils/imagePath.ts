/**
 * GitHub Pages対応の画像パスを生成する
 */
export function getImagePath(imagePath: string): string {
  // 開発環境では通常のパス
  if (process.env.NODE_ENV !== 'production') {
    return imagePath;
  }

  // 本番環境（GitHub Pages）ではbasePathを追加
  const basePath = '/tft-item-enchanter';
  
  // 既にbasePathが含まれている場合はそのまま返す
  if (imagePath.startsWith(basePath)) {
    return imagePath;
  }
  
  // パスが/で始まる場合はbasePathを前に付ける
  if (imagePath.startsWith('/')) {
    return `${basePath}${imagePath}`;
  }
  
  // パスが/で始まらない場合は/を追加してからbasePathを付ける
  return `${basePath}/${imagePath}`;
}
