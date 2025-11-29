"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/layout/navigation-bar"
import { CourseCard } from "@/components/ui/course-card"
import { StatCard } from "@/components/ui/stat-card"
import { Zap, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  lessons: number
  status: "Not started" | "In progress" | "Completed"
  progress?: number
  thumbnail?: string
  videoUrl?: string
}

export default function LearnPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const courses: Course[] = [
    {
      id: "1",
      title: "Irregular Income Budgeting 101",
      description: "Master the basics of budgeting when your income varies month to month.",
      thumbnail: "/course-1.svg",
      videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      category: "Budgeting",
      level: "Beginner",
      duration: "5 days",
      lessons: 12,
      status: "In progress",
      progress: 60,
    },
    {
      id: "2",
      title: "EMI Planning & Loan Management",
      description: "Understand EMIs, interest rates, and how to manage loans wisely.",
      thumbnail: "/course-2.svg",
      category: "Debt",
      level: "Beginner",
      duration: "7 days",
      lessons: 15,
      status: "Not started",
    },
    {
      id: "3",
      title: "Building Your Emergency Buffer",
      description: "Learn why an emergency buffer matters and how to build one systematically.",
      thumbnail: "/course-3.svg",
      category: "Savings",
      level: "Beginner",
      duration: "4 days",
      lessons: 10,
      status: "Not started",
    },
    {
      id: "4",
      title: "Investment Basics for Beginners",
      description: "Introduction to common investment types: mutual funds, stocks, and bonds.",
      thumbnail: "/course-4.svg",
      category: "Investing",
      level: "Intermediate",
      duration: "10 days",
      lessons: 20,
      status: "Not started",
    },
    {
      id: "5",
      title: "Tax Planning for Gig Workers",
      description: "Understand taxes, deductions, and how to plan your taxes as a gig worker.",
      thumbnail: "/course-5.svg",
      category: "Taxes",
      level: "Intermediate",
      duration: "6 days",
      lessons: 14,
      status: "Not started",
    },
    {
      id: "6",
      description: "Learn how to build multiple income streams and reduce income risk.",
      thumbnail: "/course-6.svg",
      description: "Learn how to build multiple income streams and reduce income risk.",
      category: "Income",
      level: "Intermediate",
      duration: "8 days",
      lessons: 18,
      status: "Not started",
    },
  ]

  const recommendedCourses = courses.filter((c) => c.status !== "Completed").slice(0, 3)
  const allCourses = courses

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Progress */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Learn & Grow</h1>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <StatCard label="Your Learning Level" value="Intermediate" icon={<BookOpen className="w-5 h-5" />} />
            <StatCard label="Financial Capability Score" value="72" unit="/100" trend={5} trendLabel="improvement" />
            <StatCard label="Modules Completed" value="8" unit="of 24" icon={<Zap className="w-5 h-5" />} />
          </div>
        </div>

        {/* Selected Course Detail Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 mb-8">
            <div className="card-animate bg-card rounded-lg max-w-2xl w-full p-8 max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-2">{selectedCourse.title}</h2>
              <p className="text-muted-foreground mb-4">{selectedCourse.description}</p>

              {/* Media: image or video */}
              {selectedCourse.videoUrl ? (
                <div className="mb-6">
                  <video className="w-full h-auto rounded-lg transition-shadow hover:shadow-lg" controls playsInline poster={selectedCourse.thumbnail}>
                    <source src={selectedCourse.videoUrl} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
                ) : selectedCourse.thumbnail ? (
                <div className="mb-6 rounded overflow-hidden">
                  <img className="w-full h-48 object-cover rounded-lg transition-shadow hover:shadow-lg" src={selectedCourse.thumbnail} alt={selectedCourse.title} />
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">Level</p>
                  <p className="font-semibold text-foreground">{selectedCourse.level}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{selectedCourse.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lessons</p>
                  <p className="font-semibold text-foreground">{selectedCourse.lessons} lessons</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-semibold text-foreground">{selectedCourse.status}</p>
                </div>
              </div>

              {selectedCourse.status === "In progress" && selectedCourse.progress && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Progress</p>
                    <p className="text-sm text-primary font-bold">{selectedCourse.progress}%</p>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: `${selectedCourse.progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  {selectedCourse.status === "In progress" ? "Continue Learning" : "Start Course"}
                </Button>
                <Button variant="outline" onClick={() => setSelectedCourse(null)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Courses Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recommended For You</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} onClick={() => setSelectedCourse(course)} />
            ))}
          </div>
        </div>

        {/* All Modules Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">All Learning Modules</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <CourseCard key={course.id} course={course} onClick={() => setSelectedCourse(course)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
