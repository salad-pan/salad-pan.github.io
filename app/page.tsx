import { Header } from "@/components/header"
import { TitleSection } from "@/components/sections/title-section"
import { AbstractSection } from "@/components/sections/abstract-section"
import { MarkdownSection } from "@/components/sections/markdown-section"
// import { LatexSection } from "@/components/sections/latex-section"
import { TableSection } from "@/components/sections/table-section"
import { CollapseSection } from "@/components/sections/collapse-section"
// import { ChartSection } from "@/components/sections/chart-section"
import { ImageSliderSection } from "@/components/sections/image-slider-section"
import { BibTexSection } from "@/components/sections/bibtex-section"

const paperData = {
  title: "SALAD-Pan: Sensor-Agnostic Latent Adaptive Diffusion for Pan-Sharpening",
  authors: [
    { name: "Junjie Li", affiliation: 1, link: "https://scholar.google.com/citations?hl=en&user=Jo_8lVcAAAAJ" },
    { name: "Congyang Ou", affiliation: 1, link: "https://github.com/ocy1" },
    { name: "Haokui Zhang", affiliation: 1, link: "https://scholar.google.com/citations?hl=en&user=m3gPwCoAAAAJ", isCorresponding: true },
    { name: "Guoting Wei", affiliation: 1, link: "https://scholar.google.com/citations?hl=en&user=NW8rUFkAAAAJ" },
    { name: "Shengqin Jiang", affiliation: 2, link: "https://ieeexplore.ieee.org/author/37086409411" },
    { name: "Ying Li", affiliation: 1 },
    { name: "Chunhua Shen", affiliation: 3, link: "https://scholar.google.com/citations?hl=en&user=Ljk2BvIAAAAJ" },
  ],
  affiliations: [
    "School of Cyberspace Security, Northwestern Polytechnical University, Xi'an, Shanxi, China",
    "School of Computer Science, Nanjing University of Information Science and Technology, Nanjing, Jiangsu, China",
    "Zhejiang University, Hangzhou, Zhejiang, China",
  ],
  venue: "",
  links: {
    paper: "#",
    arxiv: "https://arxiv.org",
    code: "https://github.com/JJLibra",
    data: "#",
    video: "#",
  },
}

const abstractText = `Recently, diffusion models bring novel insights for Pan-sharpening and notably boost fusion precision. However, most existing models perform diffusion in the pixel space and train distinct models for different multispectral (MS) imagery, suffering from high latency and sensor-specific limitations. In this paper, we present SALAD-Pan, a sensor-agnostic latent space diffusion method for efficient pansharpening. Specifically, SALAD-Pan trains a band-wise single-channel VAE to encode high-resolution multispectral (HRMS) into compact latent representations, supporting MS images with various channel counts and establishing a basis for acceleration. Then spectral physical properties, along with PAN and MS images, are injected into the diffusion backbone through unidirectional and bidirectional interactive control structures respectively, achieving high-precision fusion in the diffusion process. Finally, a lightweight cross-spectral attention module is added to the central layer of diffusion model, reinforcing spectral connections to boost spectral consistency and further elevate fusion precision. Experimental results on GaoFen-2, QuickBird, and WorldView-3 demonstrate that SALAD-Pan outperforms state-of-the-art diffusion-based methods across all three datasets, attains a 2–3$\\times$ inference speedup, and exhibits robust zero-shot (cross-sensor) capability.`

const methodologyText = `***Framework Overview.*** As illustrated in *Figure 1*, SALAD-Pan employs a two-stage training strategy. 

***Stage I: Single-Channel VAE Pretraining.***
We train a band-wise single-channel VAE that encodes each spectral band of HRMS independently into compact latent representations. This band-wise processing strategy naturally supports arbitrary numbers of spectral bands, enabling cross-sensor generalization.

***Stage II: Latent Conditional Diffusion.***
With the VAE encoder frozen, we perform conditional diffusion in the latent space. The diffusion backbone receives disentangled spatial-spectral conditioning from PAN and LRMS images via dual control branches, along with sensor-aware physical metadata via text cross-attention. A lightweight region-based cross-band attention (RCBA) module at the central layer further enhances spectral consistency.`

const methodologyFigure = {
  src: "https://salad-pan.github.io/assets/fig1-1.png",
  alt: "SALAD-Pan Architecture Overview",
  caption:
    "*Figure 1*. Overview of SALAD-Pan. Stage I trains a band-wise single-channel VAE to map each HRMS band into a compact latent space. Stage II performs band-wise conditional latent diffusion with disentangled spatial-spectral conditioning: a spatial branch encodes PAN for spatial guidance, while a spectral branch encodes the upsampled LRMS band-by-band for spectral guidance. We use hybrid coupling: bidirectional interaction in the encoder and unidirectional (branch$\\rightarrow$backbone) control in the mid block and decoder. RCBA improves inter-band consistency, and sensor-aware metadata prompts from a frozen CLIP text encoder provide additional conditioning.",
}

/*
const formulas = [
  {
    label: "Panoptic Quality (PQ)",
    latex: "PQ = SQ × RQ = (1/|TP|) × Σ IoU(p,g) × |TP|/(|TP| + ½|FP| + ½|FN|)",
    description: "Panoptic Quality combines segmentation quality (SQ) and recognition quality (RQ) into a unified metric.",
  },
  {
    label: "Adaptive Loss Function",
    latex: "L = λ₁L_cls + λ₂L_mask + λ₃L_sem + λ₄L_boundary",
    description: "Our loss function adaptively balances classification, mask prediction, semantic segmentation, and boundary refinement.",
  },
]
*/

const tableHeaders = [
  "Method",
  "Backbone",
  { content: "PQ", isLatex: false },
  { content: "SQ", isLatex: false },
  { content: "RQ", isLatex: false },
  { content: "PQ^{th}", isLatex: true },
  { content: "PQ^{st}", isLatex: true },
]
const tableRows = [
  ["Panoptic FPN", { content: "R_{50}", isLatex: true }, "39.0", "77.8", "48.1", "45.9", "28.7"],
  ["DETR", { content: "R_{50}", isLatex: true }, "43.4", "79.3", "53.8", "48.2", "35.8"],
  ["MaskFormer", { content: "R_{50}", isLatex: true }, "46.5", "80.4", "56.8", "51.0", "39.8"],
  ["Mask2Former", { content: "R_{50}", isLatex: true }, "51.9", "81.8", "62.3", "57.7", "43.0"],
  [
    { content: "SALAD-Pan (Ours)", isBold: true },
    { content: "R_{50}", isLatex: true },
    { content: "\\mathbf{54.2}", isLatex: true, isBold: true },
    { content: "\\mathbf{82.6}", isLatex: true, isBold: true },
    { content: "\\mathbf{64.7}", isLatex: true, isBold: true },
    { content: "\\mathbf{59.8}", isLatex: true, isBold: true },
    { content: "\\mathbf{45.6}", isLatex: true, isBold: true },
  ],
]

const faqItems = [
  {
    title: "What makes SALAD-Pan different from existing methods?",
    content:
      "SALAD-Pan introduces a novel semantic-aware learning mechanism that better captures the relationship between instances and their semantic categories. Unlike previous methods that treat instance and semantic segmentation separately, our approach learns a unified representation that benefits both tasks.",
  },
  {
    title: "What datasets were used for evaluation?",
    content:
      "We evaluated SALAD-Pan on three major benchmarks: COCO panoptic, ADE20K, and Cityscapes. Our method achieves state-of-the-art results on all three datasets while maintaining competitive inference speed.",
  },
  {
    title: "Is the code publicly available?",
    content:
      "Yes, we release our complete codebase, including training scripts, pre-trained models, and evaluation tools. The code is available on GitHub under the MIT license.",
  },
]

/*
const chartData = [
  { name: "COCO", ours: 54.2, maskformer: 46.5, mask2former: 51.9 },
  { name: "ADE20K", ours: 48.7, maskformer: 42.3, mask2former: 46.1 },
  { name: "Cityscapes", ours: 66.8, maskformer: 61.2, mask2former: 64.5 },
]

const chartDataKeys = [
  { key: "ours", color: "#1f1f1f", name: "SALAD-Pan (Ours)" },
  { key: "maskformer", color: "#9ca3af", name: "MaskFormer" },
  { key: "mask2former", color: "#d1d5db", name: "Mask2Former" },
]
*/

const comparisonImages = [
  {
    before: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&blur=50",
    after: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format",
    beforeLabel: "Input",
    afterLabel: "SALAD-Pan",
    caption: "Figure 1: Low-quality input vs. SALAD-Pan enhanced segmentation result.",
  },
  {
    before: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&blur=50",
    after: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format",
    beforeLabel: "Baseline",
    afterLabel: "Ours",
    caption: "Figure 2: Comparison between baseline method and our approach on complex scene.",
  },
  {
    before: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&blur=50",
    after: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format",
    beforeLabel: "Raw",
    afterLabel: "Enhanced",
    caption: "Figure 3: Raw input versus enhanced output demonstrating boundary refinement.",
  },
]

const bibtex = ``

const images = [
  {
    before: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&blur=50",
    after: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format",
    beforeLabel: "Input",
    afterLabel: "SALAD-Pan",
    caption: "Figure 1: Low-quality input vs. SALAD-Pan enhanced segmentation result.",
  },
  {
    before: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&blur=50",
    after: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format",
    beforeLabel: "Baseline",
    afterLabel: "Ours",
    caption: "Figure 2: Comparison between baseline method and our approach on complex scene.",
  },
  {
    before: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&blur=50",
    after: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format",
    beforeLabel: "Raw",
    afterLabel: "Enhanced",
    caption: "Figure 3: Raw input versus enhanced output demonstrating boundary refinement.",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-6">
        {/* Title Section */}
        <TitleSection
          title={paperData.title}
          authors={paperData.authors}
          affiliations={paperData.affiliations}
          venue={paperData.venue}
          links={paperData.links}
        />

        {/* Divider */}
        <div className="mx-auto h-px w-24 bg-border" />

        {/* Abstract */}
        <AbstractSection
          content={abstractText}
          keywords={[
            "Pan-sharpening",
            "Latent Diffusion",
            "Sensor-Agnostic",
            "Remote Sensing Image Fusion",
          ]}
        />

        <div className="mx-auto h-px w-24 bg-border" />

        {/* Methodology */}
        <MarkdownSection
          title="Methodology"
          content={methodologyText}
          figure={methodologyFigure}
        />

        <div className="mx-auto h-px w-24 bg-border" />

        {/*
        <LatexSection title="Mathematical Formulation" formulas={formulas} />
        <div className="mx-auto h-px w-24 bg-border" />
        */}

        {/* Results Table */}
        <TableSection
          title="Experimental Results"
          headers={tableHeaders}
          rows={tableRows}
          caption="Table 1: Comparison with state-of-the-art methods on COCO panoptic val set."
        />

        <div className="mx-auto h-px w-24 bg-border" />

        {/*
        <ChartSection
          title="Performance Comparison"
          data={chartData}
          dataKeys={chartDataKeys}
          caption="Figure: Panoptic Quality (PQ) comparison across different datasets."
        />
        <div className="mx-auto h-px w-24 bg-border" />
        */}

        {/* Image Slider */}
        <ImageSliderSection title="Visualizations" images={comparisonImages} />

        <div className="mx-auto h-px w-24 bg-border" />

        {/* FAQ / Collapse */}
        <CollapseSection title="Frequently Asked Questions" items={faqItems} />

        <div className="mx-auto h-px w-24 bg-border" />

        {/* BibTeX */}
        <BibTexSection citation={bibtex} />
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p className="font-serif">SALAD-Pan</p>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
