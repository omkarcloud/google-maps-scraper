import { createControls } from 'botasaurus-controls'
import { useMemo, } from 'react'
import { useState } from 'react'
import { EmptyScraper } from '../Empty/Empty'
import MarkdownComponent from '../MarkdownComponent/MarkdownComponent'
import ScraperSelector from '../ScraperSelector/ScraperSelector'
import { hasFilters, hasSorts, hasViews } from '../../utils/models'

function createApiInitializationText(baseUrl) {
  if (baseUrl) {
    return baseUrl + ', '
  } else {
    return ''
  }
}

const default_intentation = 4
function js_object_to_python_dict_string(object, indent = default_intentation, brackets_indentation = 0) {
  const x = ' '.repeat(indent)
  const brackets_indentation_Str = ' '.repeat(brackets_indentation)

  const entrieslist = Object.entries(object)
  if (entrieslist.length === 0) {
    return brackets_indentation_Str + '{}'

  }

  const entries = entrieslist.map(([key, value]) => {
    // Handle different value types
    if (typeof value === 'string') {
      return `${x}'${key}': '${value}',` // Strings need quotes
    } else if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'string') {
        const z = value.map((v) => `'${v}'`).join(', ') // Strings in arrays need quotes
        const y = `[${z}]`
        return `${x}'${key}': ${y},` // Arrays use JSON.stringify
      } else {
        return `${x}'${key}': ${JSON.stringify(value)},` // Arrays use JSON.stringify
      }

    } else if (value === null) {
      return `${x}'${key}': None,` // Null becomes None
    } else if (typeof value === 'boolean') {
      return `${x}'${key}': ${value.toString().charAt(0).toUpperCase() + value.toString().slice(1)},` // Booleans need True/False capitalization 
    } else {
      return `${x}'${key}': ${value},` // Numbers and other values directly
    }
  })

  // Construct the final Python dictionary string with indentation
  const formattedString = `${brackets_indentation_Str}{\n` + entries.join('\n') + `\n${brackets_indentation_Str}}`
  return formattedString
}
function create_canbeone_options_string(options) {
  const slicelength = 10
  if (options.length === 0) {
    return "# No options available";
  } else if (options.length > slicelength) {
    return `# Can be one among ${options.length} options: ${(options.slice(0, slicelength).map((option) => option.value)).join(', ')}, ...`;
  } else {
    return `# Can be one of the following options: ${join_strings(options.map((option) => option.value))}`;
  }
}

function create_canbeany_options_string(options) {
  const slicelength = 10

  if (options.length === 0) {
    return "# No options available";
  } else if (options.length > slicelength) {
    return `# Can be any among ${options.length} options: ${(options.slice(0, slicelength).map((option) => option.value)).join(', ')}, ...`;
  } else {
    return `# Can be any combination of the following options: ${join_strings(options.map((option) => option.value))}`;
  }
}

function filters_to_python_dict_string(filters, indent = default_intentation, brackets_indentation = 0) {
  const x = ' '.repeat(indent) + "# ";
  const brackets_indentation_str = ' '.repeat(brackets_indentation);
  if (filters.length === 0) {
    return `{} # No filters available`;
  }
  const entries = filters.map(({ id, type, options }) => {
    switch (type) {
      case 'MinNumberInput':
      case 'MaxNumberInput':
        return `${x}'${id}': 0, # Enter a number`;
      case 'IsTrueCheckbox':
      case 'IsFalseCheckbox':
      case 'IsNullCheckbox':
      case 'IsNotNullCheckbox':
      case 'IsTruthyCheckbox':
      case 'IsFalsyCheckbox':
        return `${x}'${id}': True, # Must be True Only`;
      case 'BoolSelectDropdown':
      case 'SingleSelectDropdown':
        return `${x}'${id}': 'your-option', ${create_canbeone_options_string(options)}`;
      case 'MultiSelectDropdown':
        return `${x}'${id}': ['your-option-1', 'your-option-2'], ${create_canbeany_options_string(options)}`;
      case 'SearchTextInput':
        return `${x}'${id}': '', # Enter your search text string`;
      default:
        throw Error('Not Implemented');
    }
  });

  // Construct the final Python dictionary string with indentation
  const formattedString = `{\n` + entries.join('\n') + `\n${brackets_indentation_str}}`
  return formattedString
}


function create_api_task_text(scraper_name, hasSingleScraper, default_data) {
  let x = hasSingleScraper ? '' : `scraper_name='${scraper_name}', `

  return `To create an asynchronous task, use the \`create_async_task\` method:

\`\`\`python
data = ${js_object_to_python_dict_string(default_data)}
task = api.create_async_task(${x}data)
\`\`\`

To create a synchronous task, use the \`create_sync_task\` method:

\`\`\`python
data = ${js_object_to_python_dict_string(default_data)}
task = api.create_sync_task(${x}data)
\`\`\`

You can create multiple asynchronous or synchronous tasks at once using the \`create_async_tasks\` and \`create_sync_tasks\` methods, respectively:

\`\`\`python
data_items = [
${js_object_to_python_dict_string(default_data, 8, 4)},
${js_object_to_python_dict_string(default_data, 8, 4)},
]
tasks = api.create_async_tasks(${x}data_items)
tasks = api.create_sync_tasks(${x}data_items)
\`\`\``
}


function create_scraper_task_data_text(scraper_name, hasSingleScraper) {
  let x = hasSingleScraper ? '' : `, scraper_name='${scraper_name}'`
  

  return `(data${x})`
}

function create_scraper_task_data_text2(scraper_name, hasSingleScraper) {
  let x = hasSingleScraper ? '' : `, scraper_name='${scraper_name}'`
  return `(data_items${x})`
}

function create_filter_string(filters) {
  return `\n    filters=${filters_to_python_dict_string(filters, 8, 4)}`  
}

function join_strings(strings: string[], separator:  string = 'or'): string {
  if (strings.length === 0) {
    return ""
  } else if (strings.length === 1) {
    return strings[0]
  } else {
    const lastElement = strings.pop()
    const joinedStrings = strings.join(", ")
    return `${joinedStrings} ${separator} ${lastElement}`
  }
}

function create_sort_string(sorts, default_sort) {
  return `\n    sort=None,  # sort can be one of: ${join_strings(sorts.map((view) => {
    if (view.id === default_sort) {
      return `${view.id} (default)`
    }
    return view.id
  }))}`  
}

function create_views_string(views) {
  if (views.length === 1) {
    return `\n    view=None,  # view can be ${views[0].id}`  
  }else {
    return `\n    view=None,  # view can be one of: ${join_strings(views.map((view) => view.id))}`  
  }
}


function generateList(pagination, views: any, filters: any, sorts: any) {
  const result: string[] = []

  if (pagination) {
    result.push("pagination")
  }
  if (hasViews(views)) {
    result.push("views")
  }

  if (hasFilters(filters)) {
    result.push("filters")
  }

  if (hasSorts(sorts)) {
    result.push("sorts")
  }

  return result
}

function create_fetching_task_results_text(sorts, filters, views, default_sort) {
  const ls = join_strings(generateList(true, views, filters, sorts), "or")

  return `You can also apply ${ls}:

\`\`\`python
results = api.get_task_results(
    task_id=1,
    page=1,
    per_page=20,${hasViews(views) ? create_views_string(views) : ""}${hasSorts(sorts) ? create_sort_string(sorts, default_sort) : ""}${hasFilters(filters) ? create_filter_string(filters) : ""}
)
\`\`\``
}

function create_fetching_task_text(sorts, filters, views, default_sort) {
  const ls = join_strings(generateList(true, views, filters, sorts), "or")

  return `By default, all tasks are returned. You can also apply ${ls}:

\`\`\`python
results = api.get_task_results(
    task_id=1,
    page=1,
    per_page=20,${hasViews(views) ? create_views_string(views) : ""}${hasSorts(sorts) ? create_sort_string(sorts, default_sort) : ""}${hasFilters(filters) ? create_filter_string(filters) : ""}
)
\`\`\``
}

function create_download_task_text(sorts, filters, views, default_sort) {
  const ls = join_strings(generateList(false, views, filters, sorts), "or")
  if (ls) {
    return `To download the results of a specific task in a particular format, use the \`download_task_results\` method:

\`\`\`python
results_bytes, filename = api.download_task_results(task_id=1, format='csv')
with open(filename, 'wb') as file:
    file.write(results_bytes)
\`\`\`
  
You can also apply ${ls}:

\`\`\`python
results_bytes, filename = api.download_task_results(
    task_id=1,
    format='excel',  # format can be one of: json, csv or excel${hasViews(views) ? create_views_string(views) : ""}${hasSorts(sorts) ? create_sort_string(sorts, default_sort) : ""}${hasFilters(filters) ? create_filter_string(filters) : ""}
)
\`\`\``
  } else {
    return `To download the results of a specific task in a particular format, use the \`download_task_results\` method:

\`\`\`python
results_bytes, filename = api.download_task_results(task_id=1, format='csv')
with open(filename, 'wb') as file:
    file.write(results_bytes)
\`\`\``
  }
}



function createApiREADME(baseUrl, scraper_name, hasSingleScraper, default_data, sorts, filters, views, default_sort) {

  return `# API Integration

The Botasaurus API client provides a convenient way to access the ${hasSingleScraper?'Scrapers':'Scraper'} via an API.

It provides a simple and convenient way to create, fetch, download, abort, and delete tasks, as well as manage their results.

## Usage

First, import the \`Api\` class from the library:

\`\`\`python
from botasaurus_api import Api
\`\`\`

Then, create an instance of the \`Api\` class:

\`\`\`python
api = Api(${baseUrl})
\`\`\`

Additionally, the API client will create response JSON files in the \`output/responses/\` directory to help with debugging and development. If you want to disable this feature in production, you can set \`create_response_files=False\`.

\`\`\`python
api = Api(${createApiInitializationText(baseUrl)}create_response_files=False)
\`\`\`

### Creating Tasks

There are two types of tasks:

- Asynchronous Task
- Synchronous Task

Asynchronous tasks run asynchronously, without waiting for the task to be completed. The server will return a response immediately, containing information about the task, but not the actual results. The client can then retrieve the results later.

Synchronous tasks, on the other hand, wait for the completion of the task. The server response will contain the results of the task.

You should use asynchronous tasks when you want to run a task in the background and retrieve the results later. Synchronous tasks are better suited for scenarios where you have a small number of tasks and want to wait and get the results immediately.

${create_api_task_text(scraper_name, hasSingleScraper, default_data)}

### Fetching Tasks

To fetch tasks from the server, use the \`get_tasks\` method:

\`\`\`python
tasks = api.get_tasks()
\`\`\`

${create_fetching_task_text(sorts, filters, views, default_sort)}

To fetch a specific task by its ID, use the \`get_task\` method:

\`\`\`python
task = api.get_task(task_id=1)
\`\`\`

### Fetching Task Results

To fetch the results of a specific task, use the \`get_task_results\` method:

\`\`\`python
results = api.get_task_results(task_id=1)
\`\`\`

${create_fetching_task_results_text(sorts, filters, views, default_sort)}

### Downloading Task Results

${create_download_task_text(sorts, filters, views, default_sort)}

### Aborting and Deleting Tasks

To abort a specific task, use the \`abort_task\` method:

\`\`\`python
api.abort_task(task_id=1)
\`\`\`

To delete a specific task, use the \`delete_task\` method:

\`\`\`python
api.delete_task(task_id=1)
\`\`\`

You can also bulk abort or delete multiple tasks at once using the \`abort_tasks\` and \`delete_tasks\` methods, respectively:

\`\`\`python
api.abort_tasks(1, 2, 3)
api.delete_tasks(4, 5, 6)
\`\`\`

## Examples

Here are some example usages of the API client:

\`\`\`python
from botasaurus_api import Api

# Create an instance of the API client
api = Api()

# Create an asynchronous task
data = ${js_object_to_python_dict_string(default_data)}
task = api.create_sync_task${create_scraper_task_data_text(scraper_name, hasSingleScraper)}

# Fetch the task
task = api.get_task(task['id'])

# Fetch the task results
results = api.get_task_results(task['id'])

# Download the task results as a CSV
results_bytes, filename = api.download_task_results(task['id'], format='csv')

# Abort the task
api.abort_task(task['id'])

# Delete the task
api.delete_task(task['id'])

# --- Bulk Operations ---

# Create multiple synchronous tasks
data_items = [
${js_object_to_python_dict_string(default_data, 8, 4)},
${js_object_to_python_dict_string(default_data, 8, 4)},
]
tasks = api.create_sync_tasks${create_scraper_task_data_text2(scraper_name, hasSingleScraper)}

# Fetch all tasks
all_tasks = api.get_tasks()

# Bulk abort tasks
api.abort_tasks(*[task['id'] for task in tasks])

# Bulk delete tasks
api.delete_tasks(*[task['id'] for task in tasks])
\`\`\`

## That's It!

Now, go and build something awesome.`
}

function getBaseUrl(): string {
  // Check if window is defined
  if (typeof window === 'undefined') {
    return ''
  }

  // Extract the hostname from the current URL
  const hostname = window.location.hostname

  // Check for localhost addresses and return '' if matched
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0'
  ) {
    return ''
  }

  // Return the current page URL enclosed in double quotes if none of the above conditions are met
  return `'${window.location.origin}'`
}

const ContentContainer = ({ selectedScraper, hasSingleScraper }) => {
  const baseUrl = getBaseUrl()

  const sorts = selectedScraper.sorts
  const filters = selectedScraper.filters
  const views = selectedScraper.views
  const default_sort = selectedScraper.default_sort

  const controls = useMemo(
    () => createControls(selectedScraper.input_js),
    [selectedScraper]
  )

  //@ts-ignore
  const defdata = controls.getDefaultData()

  const readmeContent = createApiREADME(baseUrl, selectedScraper.scraper_name, hasSingleScraper, defdata, sorts, filters, views, default_sort)
  return <MarkdownComponent content={readmeContent} />
}

const ScraperContainer = ({ scrapers }) => {
  const [selectedScraper, setSelectedScraper] = useState(scrapers[0])

  const hasSingleScraper = scrapers.length <= 1
  return (
    <div>
      {hasSingleScraper ? null : (
        <ScraperSelector
          scrapers={scrapers}
          selectedScraper={selectedScraper}
          onSelectScraper={setSelectedScraper}
        />
      )}
      <ContentContainer hasSingleScraper={hasSingleScraper} selectedScraper={selectedScraper} />
    </div>
  )
}

const ApiIntegrationComponent = ({ scrapers }) => {
  if (!scrapers || scrapers.length === 0) {
    return <EmptyScraper />
  }

  return <ScraperContainer scrapers={scrapers} />
}

export default ApiIntegrationComponent