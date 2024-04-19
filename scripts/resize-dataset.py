from PIL import Image
import sys
import os


def scale_down_img(input_path: str, output_path: str, scale_factor: float, quality: int) -> None:
    img = Image.open(input_path)
    size = (int(img.width * scale_factor), int(img.height * scale_factor))
    img = img.resize(size)

    img.save(output_path, quality=quality)


def walk_dir_and_resize(directory: str, quality=15, scale: float = 1) -> None:
    outputRoot = None

    for root, _, files in os.walk(directory):
        if outputRoot is None:
            outputRoot = root

        for file in files:
            if not file.endswith((".png", ".jpg", ".jpeg")):
                continue

            img_path = os.path.join(root, file)
            output_path = img_path.replace(
                outputRoot, outputRoot + "-resized-" + str(quality)
            )
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            scale_down_img(img_path, output_path, scale, quality)


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python resize-dataset.py <images_directory>", file=sys.stderr)
        return 1

    walk_dir_and_resize(sys.argv[1])
    return 0


if __name__ == "__main__":
    sys.exit(main())
