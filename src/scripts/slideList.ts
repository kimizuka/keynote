export enum SlideType {
  text = 'text',
  image = 'image',
  video = 'video'
};

export interface Slide {
  type: SlideType;
  content: string;
  textAlign?: 'left' | 'center' | 'right';
}

export const slideList: Slide[] = [{
  type: SlideType.text,
  content: `プレゼンテーション
君塚史高`,
  textAlign: 'right'
}, {
  type: SlideType.text,
  content: `こんにちは`
}, {
  type: SlideType.text,
  content: `君塚史高です`
}, {
  type: SlideType.text,
  content: `個人事業主です`
}, {
  type: SlideType.text,
  content: `普段作っているものは`
}, {
  type: SlideType.video,
  content: 'surprise-window.mp4'
}, {
  type: SlideType.text,
  content: `とか`
}, {
  type: SlideType.video,
  content: 'brilliant-fried-rice.mp4'
}, {
  type: SlideType.text,
  content: `とか`
}, {
  type: SlideType.video,
  content: 'shadow-ar.mp4'
}, {
  type: SlideType.text,
  content: `とかです`
}, {
  type: SlideType.text,
  content: `体験型展示やウェブサイトの
企画・開発をしています`
}, {
  type: SlideType.text,
  content: `よろしくお願いします`
}, {
  type: SlideType.text,
  content: `🙂 https://kimizuka.fm
🏢 https://45395.net`
}];