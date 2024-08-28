import styles from "./page.module.css"
import LandingIntro from "@/components/Sections/LandingIntro"
import LandingPlans from "@/components/Sections/LandingPlans"
import ClassroomInclude from "@/components/Sections/ClassroomInclude"

export default function Home() {
  return (
    <main className={styles.main}>
      <LandingIntro />
      <LandingPlans />
      <ClassroomInclude />
    </main>
  )
}
