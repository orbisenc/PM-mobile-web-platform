export type ModelItem = {
  id: string;
  label: string;
  uid: string;
  description: string;
  modelTitle?: string;
  modelUrl?: string;
  authorName?: string;
  authorUrl?: string;
};

export type VideoItem = {
  type: "youtube" | "mp4";
  source: string;
  title: string;
  description: string;
  thumbnail: string;
};

export type ComparisonRow = {
  category: string;
  before: string;
  after: string;
};

export type ProjectContent = {
  name: string;
  location: string;
  scale: string;
  summary: string;
  purpose: string;
  period: string;
  contact: string;
  heroImage: string;
  galleryImages: string[];
  models: ModelItem[];
  video: VideoItem;
  siteVideo: VideoItem;
  comparisons: ComparisonRow[];
  documentVersion: string;
  documentText: string;
};

export type ConsentDraft = {
  name: string;
  building: string;
  unit: string;
  phone: string;
  decision: "agree" | "disagree";
  privacyRequired: boolean;
  marketingOptional: boolean;
  signature: string;
  documentVersion: string;
};

export type DemoSubmission = ConsentDraft & {
  receiptNumber: string;
  submittedAt: string;
};
