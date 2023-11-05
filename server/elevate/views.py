from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from elevate.exceptions import PromptError
import json
from .config import OPENAI_API_KEY
import openai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def generate_prompt(keywords, difficulty, prompt_type=None):

    if difficulty == "Beginner":
        prompt = f"Generate 5 interview questions based on any random topics from the following set of topics - {keywords}. The level of questions should be {difficulty}. Shuffle the questions. Don't include extra words above or after the questions."
        return prompt
    else:
        prompt = f"Generate 10 interview questions based on any random topics from the following set of topics - {keywords}. The level of questions should be {difficulty}. Shuffle the questions. Don't include extra words above or after the questions."
        return prompt


def generate_analysis_prompt(question, answer):
    
    prompt = f"Interviewer\'s question -  {question} \nMy answer - {answer} \nGive a short and crisp analysis of my answer to the interviewer\'s question in not more than 100 words. The format of the structured analysis should be as follows- \nRelevance and Accuracy: \nDepth of knowledge: \nConfidence and Clarity: \nStrong topics: \nWeak topics: \nKeep the analysis to the point. Also rate my answer on a scale of 10 and give the rating at the end as \"Rating: \". Don\'t include extra words above or after the analysis."
    return prompt

def send_request(keywords,difficulty):

    try:
        prompt = generate_prompt(keywords,difficulty)
        
        if prompt:
            openai.api_key = OPENAI_API_KEY

            response = openai.Completion.create(
                model="gpt-3.5-turbo-instruct",
                prompt=prompt,
                max_tokens=500
            )
            generated_text = response.choices[0].text

            return generated_text
        else:
            raise PromptError("Prompt is empty")

    except:
        raise PromptError("OpenAI API error")

def modify_text(text): 

    topics_list=text.split('\n')
    modified_text={}
    
    for topic in topics_list:
        topic=topic.strip()
        if topic!='': 
            key,value=topic.split(": ")
            modified_text[key]=value

    return modified_text


def send_analysis_request(question,answer):

    try:
        prompt = generate_analysis_prompt(question,answer)
        
        if prompt:
            openai.api_key = OPENAI_API_KEY

            response = openai.Completion.create(
                model="gpt-3.5-turbo-instruct",
                prompt=prompt,
                max_tokens=1000
            )
            generated_text = response.choices[0].text

            modified_text=modify_text(generated_text)    
            
            return JsonResponse(modified_text)
        
        else:
            raise PromptError("Prompt is empty")

    except:
        raise PromptError("OpenAI API error")

@csrf_exempt 
def start_interview(request):

    try:
        if request.method == 'POST':
            data = json.loads(request.body.decode('utf-8'))
            keywords = data['keywords']
            difficulty = data['difficulty']

            
            response = send_request(keywords,difficulty)

            if(len(keywords) == 0):
                return HttpResponse("Invalid Input", status=404)
            
            return HttpResponse(response)

        else:
            return HttpResponse("Bad request type", status=400)
        


    # Exceptions

    except PromptError as e:
        error_message = f"An error occurred: {str(e)}"
        return HttpResponse(error_message, status=500)
    
    except ObjectDoesNotExist:
        return HttpResponse("Object does not exist.", status=404)
    
    except Exception as e:
        error_message = f"An error occurred: {str(e)}"
        return HttpResponse(error_message, status=500)
    
@csrf_exempt 
def start_analysis(request):

    try:
        if request.method == 'POST':
            data = json.loads(request.body.decode('utf-8'))
            question = data['question']
            answer = data['answer']

            
            response = send_analysis_request(question,answer)

            if(question == "" or answer == ""):
                return HttpResponse("Invalid Input", status=404)
            
            return HttpResponse(response)

        else:
            return HttpResponse("Bad request type", status=400)
        


    # Exceptions

    except PromptError as e:
        error_message = f"An error occurred: {str(e)}"
        return HttpResponse(error_message, status=500)
    
    except ObjectDoesNotExist:
        return HttpResponse("Object does not exist.", status=404)
    
    except Exception as e:
        error_message = f"An error occurred: {str(e)}"
        return HttpResponse(error_message, status=500)
