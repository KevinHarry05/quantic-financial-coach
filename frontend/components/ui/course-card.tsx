"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock } from "lucide-react"

interface CourseCardProps {
  course: {
    id: string
    title: string
    description: string
    level: "Beginner" | "Intermediate" | "Advanced"
    duration: string
    lessons: number
    status: "Not started" | "In progress" | "Completed"
    progress?: number
    thumbnail?: string
    videoUrl?: string
  }
  onClick: () => void
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  const levelColors = {
    Beginner: "bg-success/10 text-success border-success/20",
    Intermediate: "bg-primary/10 text-primary border-primary/20",
    Advanced: "bg-warning/10 text-warning border-warning/20",
  }

  return (
    <div
      onClick={onClick}
      className="card-animate rounded-lg border border-border bg-card p-6 hover:shadow-lg hover:border-primary/50 transition transform hover:-translate-y-1 hover:scale-[1.01] cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <Badge className={`${levelColors[course.level]} border`}>{course.level}</Badge>
        <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">{course.status}</span>
      </div>

      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{course.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

      <div className="space-y-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {course.lessons} lessons
          </span>
        </div>

        {course.status === "In progress" && course.progress && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Progress</span>
              <span className="text-xs font-bold text-success">{course.progress}%</span>
            {/* Course thumbnail */}
            {course.thumbnail && (
              <div className="mb-4 rounded overflow-hidden h-40 w-full bg-muted flex items-center justify-center">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-opacity duration-300" />
              </div>
            )}
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full bg-transparent"
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          {course.status === "Completed" ? "Review" : "View Details"}
        </Button>
      </div>
    </div>
  )
}
