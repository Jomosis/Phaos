import { generateText } from '@eliza/core';

export class TruthExtractor {
  private truths: string[] = [];

  private readonly TRUTH_PROMPT = `
You are a professional data analyst and truth extraction expert, skilled at identifying and extracting key facts from complex data.

# Input Data
{input_data}

# Output Format
<truths_start>
truth: [Truth 1]
evidence: [Specific data supporting the truth]
confidence: [High/Medium/Low]
source: [Data location/number]
<truths_end>
`;

  async extractTruths(inputData: string): Promise<string> {
    const prompt = this.TRUTH_PROMPT.replace('{input_data}', inputData);

    const response = await generateText({
      prompt,
      model: 'gpt-4o-mini',
      temperature: 0.7
    });

    const truths = this.extractTruthsSection(response);
    this.truths.push(...truths.split('\n\n'));

    return "Truths extracted and stored successfully!";
  }

  getRandomTruth(): string {
    if (this.truths.length === 0) {
      return "No truths available.";
    }
    const index = Math.floor(Math.random() * this.truths.length);
    const truth = this.truths[index];
    this.truths.splice(index, 1);
    return truth;
  }

  private extractTruthsSection(text: string): string {
    const start = text.indexOf('<truths_start>') + '<truths_start>'.length;
    const end = text.indexOf('<truths_end>');
    return text.slice(start, end).trim();
  }
}