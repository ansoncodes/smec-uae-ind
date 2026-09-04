import Image from "next/image";
import styles from "./Logo.module.css";

/**
 * Prototype logo lock-up (mark + word + small mono line), built from the real
 * SMEC wordmark. The mark is navy on transparent, so it is reversed to white
 * for the dark ground.
 */
export default function Logo({
  href = "https://smecoilandgas.com/",
  priority = false,
}: {
  href?: string;
  priority?: boolean;
}) {
  return (
    <a href={href} className={styles.logo} aria-label="SMEC Oil and Gas home">
      <Image
        src="/logos/smec-mark.png"
        alt="SMEC"
        width={782}
        height={214}
        priority={priority}
        className={styles.mark}
      />
      <span className={styles.word}>
        <small>Oil &amp; Gas</small>
        <small>Solutions LLC</small>
      </span>
    </a>
  );
}
