/* Set video to a browser-accessible URL after the author selects each clip.
 * Local /project/... paths are not public media URLs. See README.md.
 * Use the caption and details fields to identify panel order, task, model,
 * camera conditions, and whether this is a rendering or a physical capture.
 */
window.ADVSCENE_DEMOS = [
  {
    id: "objects",
    title: "CO3D Scene Robustness Evaluation",
    dataset: "CO3D",
    placeholder: "CO3D Evaluation",
    description: "Evaluation of fixed adversarial patches under controlled changes in object-relative viewpoint and distance.",
    details: "",
    video: null,
    poster: null,
    captions: null
  },
  {
    id: "driving",
    title: "Waymo Scene Robustness Evaluation",
    dataset: "Waymo",
    placeholder: "Waymo Evaluation",
    description: "Evaluation of disappearance attacks on roadside targets along camera trajectories, with variations in distance, viewing geometry, and projected patch footprint.",
    details: "",
    video: null,
    poster: null,
    captions: null
  },
  {
    id: "physical",
    title: "Fidelity Validation with Physical Captures",
    dataset: "Matched Physical Captures",
    placeholder: "Physical Validation",
    description: "Comparison of physically deployed patches and corresponding rendered observations under matched camera poses.",
    details: "",
    video: null,
    poster: null,
    captions: null
  }
];
