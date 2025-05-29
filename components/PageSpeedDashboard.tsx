"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Gauge,
  Smartphone,
  Monitor,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Eye,
} from "lucide-react"
import {
  type PageSpeedResult,
  formatMetricValue,
  getScoreColor,
  getCoreWebVitalColor,
  getPerformanceRecommendations,
} from "@/lib/pagespeed-insights"

interface PageSpeedDashboardProps {
  defaultUrl?: string
}

export default function PageSpeedDashboard({ defaultUrl }: PageSpeedDashboardProps) {
  const [url, setUrl] = useState(defaultUrl || "")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{
    mobile?: PageSpeedResult
    desktop?: PageSpeedResult
  }>({})
  const [error, setError] = useState<string | null>(null)
  const [activeStrategy, setActiveStrategy] = useState<"mobile" | "desktop">("mobile")

  const analyzeUrl = async (strategy: "mobile" | "desktop") => {
    if (!url) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/pagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze page")
      }

      const result = await response.json()
      setResults((prev) => ({ ...prev, [strategy]: result }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const analyzeBoth = async () => {
    if (!url) return

    setLoading(true)
    setError(null)

    try {
      const [mobileResponse, desktopResponse] = await Promise.all([
        fetch(`/api/pagespeed?url=${encodeURIComponent(url)}&strategy=mobile`),
        fetch(`/api/pagespeed?url=${encodeURIComponent(url)}&strategy=desktop`),
      ])

      const [mobileResult, desktopResult] = await Promise.all([mobileResponse.json(), desktopResponse.json()])

      setResults({
        mobile: mobileResult,
        desktop: desktopResult,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const currentResult = results[activeStrategy]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            PageSpeed Insights Dashboard
          </CardTitle>
          <CardDescription>
            Analyze your website's performance, accessibility, and SEO using Google's PageSpeed Insights API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter URL to analyze (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={analyzeBoth} disabled={loading || !url} className="min-w-[120px]">
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {(results.mobile || results.desktop) && (
        <Tabs value={activeStrategy} onValueChange={(value) => setActiveStrategy(value as "mobile" | "desktop")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile
              {results.mobile && (
                <Badge variant="outline" className={getScoreColor(results.mobile.metrics.performanceScore)}>
                  {results.mobile.metrics.performanceScore}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="desktop" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Desktop
              {results.desktop && (
                <Badge variant="outline" className={getScoreColor(results.desktop.metrics.performanceScore)}>
                  {results.desktop.metrics.performanceScore}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {currentResult && (
            <TabsContent value={activeStrategy} className="space-y-6">
              {/* Performance Scores */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Performance</p>
                        <p className={`text-2xl font-bold ${getScoreColor(currentResult.metrics.performanceScore)}`}>
                          {currentResult.metrics.performanceScore}
                        </p>
                      </div>
                      <Zap className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={currentResult.metrics.performanceScore} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Accessibility</p>
                        <p className={`text-2xl font-bold ${getScoreColor(currentResult.metrics.accessibilityScore)}`}>
                          {currentResult.metrics.accessibilityScore}
                        </p>
                      </div>
                      <Eye className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={currentResult.metrics.accessibilityScore} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Best Practices</p>
                        <p className={`text-2xl font-bold ${getScoreColor(currentResult.metrics.bestPracticesScore)}`}>
                          {currentResult.metrics.bestPracticesScore}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={currentResult.metrics.bestPracticesScore} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">SEO</p>
                        <p className={`text-2xl font-bold ${getScoreColor(currentResult.metrics.seoScore)}`}>
                          {currentResult.metrics.seoScore}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Progress value={currentResult.metrics.seoScore} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Core Web Vitals */}
              <Card>
                <CardHeader>
                  <CardTitle>Core Web Vitals</CardTitle>
                  <CardDescription>Key metrics that measure real-world user experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Largest Contentful Paint</p>
                      <p
                        className={`text-xl font-bold ${getCoreWebVitalColor("lcp", currentResult.metrics.largestContentfulPaint)}`}
                      >
                        {formatMetricValue(currentResult.metrics.largestContentfulPaint, "time")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Good: ≤ 2.5s</p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">First Input Delay</p>
                      <p
                        className={`text-xl font-bold ${getCoreWebVitalColor("fid", currentResult.metrics.firstInputDelay)}`}
                      >
                        {formatMetricValue(currentResult.metrics.firstInputDelay, "time")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Good: ≤ 100ms</p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Cumulative Layout Shift</p>
                      <p
                        className={`text-xl font-bold ${getCoreWebVitalColor("cls", currentResult.metrics.cumulativeLayoutShift)}`}
                      >
                        {formatMetricValue(currentResult.metrics.cumulativeLayoutShift, "cls")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Good: ≤ 0.1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Recommendations</CardTitle>
                  <CardDescription>Actionable suggestions to improve your page performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getPerformanceRecommendations(currentResult).map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Opportunities */}
              {currentResult.opportunities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Opportunities</CardTitle>
                    <CardDescription>Specific improvements that could enhance performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentResult.opportunities.slice(0, 5).map((opportunity) => (
                        <div key={opportunity.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{opportunity.title}</h4>
                            {opportunity.displayValue && <Badge variant="outline">{opportunity.displayValue}</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  )
}
