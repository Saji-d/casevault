import os
import re
import yaml
from datetime import datetime, date
from typing import Dict, Any, Generator, Optional

class MarkdownLoader:
    """
    Parses Markdown files containing YAML front matter.
    Extracts metadata, content, tags, and generates summaries.
    """
    
    @staticmethod
    def parse_front_matter(file_content: str) -> tuple[Dict[str, Any], str]:
        """
        Splits file content into YAML front matter dictionary and Markdown body.
        """
        # Match standard YAML front matter: --- at the beginning, followed by anything, followed by ---
        match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", file_content, re.DOTALL)
        if not match:
            # Fallback if no front matter
            return {}, file_content

        yaml_text = match.group(1)
        body = match.group(2)
        
        try:
            metadata = yaml.safe_load(yaml_text) or {}
            return metadata, body
        except Exception as e:
            print(f"Error parsing YAML: {e}")
            return {}, file_content

    @staticmethod
    def clean_text_for_summary(markdown_body: str, max_length: int = 250) -> str:
        """
        Cleans markdown syntax to extract a plain text summary.
        """
        # Remove headers (e.g., # Header)
        text = re.sub(r"#+\s+.*?\n", "", markdown_body)
        # Remove bold/italic formatting
        text = re.sub(r"[\*\_]{1,3}", "", text)
        # Remove links [text](url) -> text
        text = re.sub(r"\[(.*?)\]\(.*?\)", r"\1", text)
        # Remove code blocks
        text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
        # Collapse whitespace and newlines
        text = re.sub(r"\s+", " ", text).strip()
        
        if len(text) > max_length:
            return text[:max_length] + "..."
        return text

    def load_file(self, file_path: str, relative_path: str) -> Dict[str, Any]:
        """
        Loads and parses a single markdown file.
        """
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        metadata, body = self.parse_front_matter(content)
        
        # Determine slug from file name if not in metadata
        base_name = os.path.splitext(os.path.basename(file_path))[0]
        slug = metadata.get("slug", base_name)
        
        # Parse tags
        tags = metadata.get("tags", [])
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(",") if t.strip()]
            
        # Parse updated_at date
        updated_at_val = metadata.get("updated_at")
        updated_date = None
        if updated_at_val:
            if isinstance(updated_at_val, date):
                updated_date = updated_at_val
            elif isinstance(updated_at_val, datetime):
                updated_date = updated_at_val.date()
            elif isinstance(updated_at_val, str):
                try:
                    # Try YYYY-MM-DD
                    updated_date = datetime.strptime(updated_at_val[:10], "%Y-%m-%d").date()
                except ValueError:
                    try:
                        # Try parsing custom datetime string
                        updated_date = datetime.fromisoformat(updated_at_val).date()
                    except ValueError:
                        updated_date = None

        # Build clean summary
        summary = metadata.get("summary")
        if not summary:
            summary = self.clean_text_for_summary(body)

        return {
            "slug": slug,
            "title": metadata.get("title", base_name.replace("-", " ").title()),
            "year": int(metadata.get("year", datetime.now().year)),
            "category": metadata.get("category", "General"),
            "act_number": metadata.get("act_number"),
            "language": metadata.get("language", "English"),
            "status": metadata.get("status", "Active"),
            "jurisdiction": metadata.get("jurisdiction", "Bangladesh"),
            "source": metadata.get("source", "Official Gazette"),
            "updated_at": updated_date,
            "summary": summary,
            "content": body,
            "tags": tags,
            "file_path": relative_path
        }

    def scan_directory(self, dir_path: str) -> Generator[Dict[str, Any], None, None]:
        """
        Recursively scans a directory for markdown files and yields parsed documents.
        """
        if not os.path.exists(dir_path):
            print(f"Directory {dir_path} does not exist.")
            return

        for root, _, files in os.walk(dir_path):
            for file in files:
                if file.endswith(".md"):
                    full_path = os.path.join(root, file)
                    relative_path = os.path.relpath(full_path, dir_path)
                    try:
                        yield self.load_file(full_path, relative_path)
                    except Exception as e:
                        print(f"Failed to load {full_path}: {e}")
