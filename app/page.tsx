import { Header } from "@/components/header"
import { TitleSection } from "@/components/sections/title-section"
import { AbstractSection } from "@/components/sections/abstract-section"
import { MarkdownSection } from "@/components/sections/markdown-section"
// import { LatexSection } from "@/components/sections/latex-section"
import { TableSection } from "@/components/sections/table-section"
// import { CollapseSection } from "@/components/sections/collapse-section"
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
    "Northwestern Polytechnical University, Xi'an, Shanxi, China",
    "Nanjing University of Information Science and Technology, Nanjing, Jiangsu, China",
    "Zhejiang University, Hangzhou, Zhejiang, China",
  ],
  venue: "",
  links: {
    paper: "https://arxiv.org/abs/2602.04473",
    arxiv: "https://arxiv.org/abs/2602.04473",
    code: "https://github.com/JJLibra/SALAD-Pan",
    models: "https://huggingface.co/xxfer/SALAD-Pan",
    data: "https://huggingface.co/xxfer/SALAD-Pan",
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

const experimentalTables = [
  {
    name: "WorldView-3",
    // caption: "Table 1. Quantitative results on the WorldView-3 (WV3) dataset. Best and second-best results are in bold and underlined.",
    caption: "",
    columnGroups: [
      { label: "Methods", colspan: 2 },
      { label: "Reduced Resolution", colspan: 4 },
      { label: "Full Resolution", colspan: 3 },
    ],
    headers: [
      "Models",
      "Pub/Year",
      { content: "Q_8 \\uparrow", isLatex: true },
      { content: "SAM \\downarrow", isLatex: true },
      { content: "ERGAS \\downarrow", isLatex: true },
      { content: "SCC \\uparrow", isLatex: true },
      { content: "D_\\lambda \\downarrow", isLatex: true },
      { content: "D_s \\downarrow", isLatex: true },
      { content: "HQNR \\uparrow", isLatex: true },
    ],
    rows: [
      ["PanNet", "ICCV'17", "0.891±0.045", "3.613±0.787", "2.664±0.347", "0.943±0.018", "0.017±0.008", "0.047±0.014", "0.937±0.015"],
      ["FusionNet", "TGRS'20", "0.904±0.092", "3.324±0.411", "2.465±0.603", "0.958±0.023", "0.024±0.011", "0.036±0.016", "0.940±0.019"],
      ["LAGConv", "AAAI'22", "0.910±0.114", "3.104±1.119", "2.300±0.911", "0.980±0.043", "0.036±0.009", "0.032±0.016", "0.934±0.011"],
      ["BiMPan", "ACMM'23", "0.915±0.087", "2.984±0.601", "2.257±0.552", "0.984±0.005", "0.017±0.019", "0.035±0.015", "0.949±0.026"],
      ["ARConv", "CVPR'25", { content: "0.916±0.083", isUnderline: true }, "2.858±0.590", "2.117±0.528", { content: "0.989±0.014", isUnderline: true }, { content: "0.014±0.006", isUnderline: true }, { content: "0.030±0.007", isUnderline: true }, { content: "0.958±0.010", isUnderline: true }],
      ["WFANet", "AAAI'25", "0.917±0.088", "2.855±0.618", "2.095±0.422", { content: "0.989±0.011", isUnderline: true }, "0.012±0.007", "0.031±0.009", "0.957±0.010"],
      ["PanDiff", "TGRS'23", "0.898±0.090", "3.297±0.235", "2.467±0.166", "0.980±0.019", "0.027±0.108", "0.054±0.047", "0.920±0.077"],
      ["SSDiff", "NeurIPS'24", "0.915±0.086", "2.843±0.529", "2.106±0.416", "0.986±0.004", "0.013±0.005", "0.031±0.003", "0.956±0.010"],
      ["SGDiff", "CVPR'25", { content: "0.921±0.082", isUnderline: true }, "2.771±0.511", "2.044±0.449", "0.987±0.009", "0.012±0.005", "0.027±0.003", "0.960±0.006"],
      [
        { content: "SALAD-PAN", isBold: true },
        "",
        { content: "0.924±0.064", isBold: true },
        { content: "2.689±0.135", isBold: true },
        { content: "1.839±0.211", isBold: true },
        { content: "0.989±0.007", isBold: true },
        { content: "0.010±0.008", isBold: true },
        { content: "0.021±0.004", isBold: true },
        { content: "0.965±0.007", isBold: true },
      ],
    ],
    separatorAfterRows: [5, 8],
  },
  {
    name: "QuickBird",
    caption: "",
    // caption: "Table 2. Quantitative results on the QuickBird (QB) dataset. Best and second-best results are in bold and underlined.",
    columnGroups: [
      { label: "Methods", colspan: 2 },
      { label: "Reduced Resolution", colspan: 4 },
      { label: "Full Resolution", colspan: 3 },
    ],
    headers: [
      "Models",
      "Pub/Year",
      { content: "Q_4 \\uparrow", isLatex: true },
      { content: "SAM \\downarrow", isLatex: true },
      { content: "ERGAS \\downarrow", isLatex: true },
      { content: "SCC \\uparrow", isLatex: true },
      { content: "D_\\lambda \\downarrow", isLatex: true },
      { content: "D_s \\downarrow", isLatex: true },
      { content: "HQNR \\uparrow", isLatex: true },
    ],
    rows: [
      ["PanNet", "ICCV'17", "0.885±0.118", "5.791±0.995", "5.863±0.413", "0.948±0.021", "0.059±0.017", "0.061±0.010", "0.883±0.025"],
      ["FusionNet", "TGRS'20", "0.925±0.087", "4.923±0.812", "4.159±0.351", "0.956±0.018", "0.059±0.019", "0.052±0.009", "0.892±0.022"],
      ["LAGConv", "AAAI'22", "0.916±0.130", "4.370±0.720", "3.740±0.290", "0.959±0.047", "0.085±0.024", "0.068±0.014", "0.853±0.018"],
      ["BiMPan", "ACMM'23", "0.931±0.091", "4.586±0.821", "3.840±0.319", "0.980±0.008", "0.026±0.020", "0.040±0.013", "0.935±0.030"],
      ["ARConv", "CVPR'25", "0.936±0.088", "4.453±0.499", "3.649±0.401", { content: "0.987±0.009", isUnderline: true }, { content: "0.019±0.014", isUnderline: true }, "0.034±0.017", "0.948±0.042"],
      ["WFANet", "AAAI'25", "0.935±0.092", "4.490±0.582", "3.604±0.337", "0.986±0.008", { content: "0.019±0.016", isUnderline: true }, "0.033±0.019", "0.948±0.037"],
      ["PanDiff", "TGRS'23", "0.934±0.095", "4.575±0.255", "3.742±0.353", "0.980±0.007", "0.058±0.015", "0.064±0.020", "0.881±0.075"],
      ["SSDiff", "NeurIPS'24", "0.934±0.094", "4.464±0.747", "3.632±0.275", "0.982±0.008", "0.031±0.011", "0.036±0.013", "0.934±0.021"],
      ["SGDiff", "CVPR'25", { content: "0.938±0.087", isUnderline: true }, { content: "4.353±0.741", isUnderline: true }, { content: "3.578±0.290", isUnderline: true }, "0.983±0.007", "0.023±0.013", "0.043±0.012", "0.934±0.011"],
      [
        { content: "SALAD-PAN", isBold: true },
        "",
        { content: "0.939±0.088", isBold: true },
        { content: "4.198±0.526", isBold: true },
        { content: "3.251±0.288", isBold: true },
        { content: "0.984±0.009", isBold: true },
        { content: "0.017±0.011", isBold: true },
        { content: "0.026±0.009", isBold: true },
        { content: "0.957±0.010", isBold: true },
      ],
    ],
    separatorAfterRows: [5, 8],
  },
  {
    name: "GaoFen-2",
    caption: "",
    // caption: "Table 3. Quantitative results on the GaoFen-2 (GF2) dataset. Best and second-best results are in bold and underlined.",
    columnGroups: [
      { label: "Methods", colspan: 2 },
      { label: "Reduced Resolution (RR)", colspan: 4 },
      { label: "Full Resolution (FR)", colspan: 3 },
    ],
    headers: [
      "Models",
      "Pub/Year",
      { content: "Q_4 \\uparrow", isLatex: true },
      { content: "SAM \\downarrow", isLatex: true },
      { content: "ERGAS \\downarrow", isLatex: true },
      { content: "SCC \\uparrow", isLatex: true },
      { content: "D_\\lambda \\downarrow", isLatex: true },
      { content: "D_s \\downarrow", isLatex: true },
      { content: "HQNR \\uparrow", isLatex: true },
    ],
    rows: [
      ["PanNet", "ICCV'17", "0.967±0.013", "0.997±0.022", "0.919±0.039", "0.973±0.011", "0.017±0.012", "0.047±0.012", "0.937±0.023"],
      ["FusionNet", "TGRS'20", "0.964±0.014", "0.974±0.035", "0.988±0.072", "0.971±0.012", "0.040±0.013", "0.101±0.014", "0.863±0.018"],
      ["LAGConv", "AAAI'22", "0.970±0.011", "1.080±0.023", "0.910±0.045", "0.977±0.006", "0.033±0.013", "0.079±0.013", "0.891±0.021"],
      ["BiMPan", "ACMM'23", "0.965±0.020", "0.902±0.066", "0.881±0.058", "0.972±0.018", "0.032±0.015", "0.051±0.014", "0.918±0.019"],
      [
        "ARConv",
        "CVPR'25",
        "0.982±0.013",
        "0.710±0.149",
        "0.645±0.127",
        { content: "0.994±0.005", isUnderline: true },
        "0.007±0.005",
        "0.029±0.019",
        "0.963±0.018",
      ],
      [
        "WFANet",
        "AAAI'25",
        "0.981±0.007",
        "0.751±0.082",
        "0.657±0.074",
        { content: "0.994±0.002", isBold: true },
        { content: "0.003±0.003", isBold: true },
        "0.032±0.021",
        { content: "0.964±0.020", isUnderline: true },
      ],
      ["PanDiff", "TGRS'23", "0.979±0.011", "0.888±0.037", "0.746±0.031", "0.988±0.003", "0.027±0.011", "0.073±0.013", "0.903±0.025"],
      [
        "SSDiff",
        "NeurIPS'24",
        { content: "0.983±0.007", isBold: true },
        { content: "0.670±0.124", isUnderline: true },
        { content: "0.604±0.108", isUnderline: true },
        "0.991±0.006",
        "0.016±0.009",
        "0.027±0.027",
        "0.957±0.010",
      ],
      [
        "SGDiff",
        "CVPR'25",
        "0.980±0.011",
        "0.708±0.119",
        "0.668±0.094",
        "0.989±0.005",
        "0.020±0.013",
        { content: "0.024±0.022", isUnderline: true },
        "0.959±0.011",
      ],
      [
        { content: "SALAD-PAN", isBold: true },
        "",
        { content: "0.982±0.010", isUnderline: true },
        { content: "0.667±0.051", isBold: true },
        { content: "0.592±0.088", isBold: true },
        "0.991±0.003",
        { content: "0.005±0.002", isUnderline: true },
        { content: "0.022±0.014", isBold: true },
        { content: "0.973±0.010", isBold: true },
      ],
    ],
    separatorAfterRows: [5, 8],
  },
]

/*
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
*/

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

type VisSample = {
  input: string
  before: string
  after: string
}

type VisDataset = {
  name: string
  images: VisSample[]
}

const makeTripletSamples = (opts: {
  count: number
  getPanUrl: (index1Based: number) => string
  getLrmsUrl: (index1Based: number) => string
  getSaladUrl: (index1Based: number) => string
}): VisSample[] => {
  const { count, getPanUrl, getLrmsUrl, getSaladUrl } = opts
  return Array.from({ length: count }, (_, i) => {
    const k = i + 1 // 1-based
    return {
      input: getPanUrl(k),
      before: getLrmsUrl(k),
      after: getSaladUrl(k),
    }
  })
}

const VIS_ASSET_BASE = "https://salad-pan.github.io/"
const VIS_COUNT_PER_DATASET = 20

const pad3 = (n: number) => String(n).padStart(3, "0")

const visualizationDatasets: VisDataset[] = [
  {
    name: "WorldView-3",
    images: makeTripletSamples({
      count: VIS_COUNT_PER_DATASET,
      getPanUrl: (k) => `${VIS_ASSET_BASE}/visualizations/wv3/${pad3(k)}_pan.png`,
      getLrmsUrl: (k) => `${VIS_ASSET_BASE}/visualizations/wv3/${pad3(k)}_lrms.png`,
      getSaladUrl: (k) => `${VIS_ASSET_BASE}/visualizations/wv3/${pad3(k)}_salad.png`,
    }),
  },
  {
    name: "WorldView-2",
    images: makeTripletSamples({
      count: VIS_COUNT_PER_DATASET,
      getPanUrl: (k) => `${VIS_ASSET_BASE}/visualizations/wv2/${pad3(k)}_pan.png`,
      getLrmsUrl: (k) => `${VIS_ASSET_BASE}/visualizations/wv2/${pad3(k)}_lrms.png`,
      getSaladUrl: (k) => `${VIS_ASSET_BASE}/visualizations/wv2/${pad3(k)}_salad.png`,
    }),
  },
  {
    name: "QuickBird",
    images: makeTripletSamples({
      count: VIS_COUNT_PER_DATASET,
      getPanUrl: (k) => `${VIS_ASSET_BASE}/visualizations/qb/${pad3(k)}_pan.png`,
      getLrmsUrl: (k) => `${VIS_ASSET_BASE}/visualizations/qb/${pad3(k)}_lrms.png`,
      getSaladUrl: (k) => `${VIS_ASSET_BASE}/visualizations/qb/${pad3(k)}_salad.png`,
    }),
  },
  {
    name: "GaoFen-2",
    images: makeTripletSamples({
      count: VIS_COUNT_PER_DATASET,
      getPanUrl: (k) => `${VIS_ASSET_BASE}/visualizations/gf2/${pad3(k)}_pan.png`,
      getLrmsUrl: (k) => `${VIS_ASSET_BASE}/visualizations/gf2/${pad3(k)}_lrms.png`,
      getSaladUrl: (k) => `${VIS_ASSET_BASE}/visualizations/gf2/${pad3(k)}_salad.png`,
    }),
  },
]

const bibtex = `@misc{li2026_saladpan,
      title={SALAD-Pan: Sensor-Agnostic Latent Adaptive Diffusion for Pan-Sharpening}, 
      author={Junjie Li and Congyang Ou and Haokui Zhang and Guoting Wei and Shengqin Jiang and Ying Li and Chunhua Shen},
      year={2026},
      eprint={2602.04473},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2602.04473}, 
}`

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
          keywords={["Pan-sharpening", "Latent Diffusion", "Sensor-Agnostic", "Remote Sensing Image Fusion"]}
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
          tables={experimentalTables}
          note="Best results are in bold. Second-best results are underlined."
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
        <ImageSliderSection
          title="Visualizations"
          datasets={visualizationDatasets}
          beforeLabel="LRMS"
          afterLabel="SALAD-Pan"
        />

        <div className="mx-auto h-px w-24 bg-border" />

        {/* FAQ / Collapse */}
        {/*
        <CollapseSection title="Frequently Asked Questions" items={faqItems} />
        <div className="mx-auto h-px w-24 bg-border" />
        */}

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
