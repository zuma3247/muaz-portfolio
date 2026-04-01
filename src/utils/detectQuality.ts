export type QualityTier = "full3d" | "lite3d" | "css3d" | "dom2d";

export function detectQualityTier(): QualityTier {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return "dom2d";
  } catch {
    return "dom2d";
  }

  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.includes("android");
  const lowCPU = navigator.hardwareConcurrency <= 4;
  if (isAndroid && lowCPU) return "css3d";

  if (window.innerWidth < 768) return "lite3d";

  return "full3d";
}
