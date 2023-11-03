from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from elevate.exceptions import InvalidInterviewLength


def get_question_count(interview_length, difficulty):
    if(interview_length == "small"):
        return 5
    elif(interview_length == "long"):
        return 10
    else:
        raise InvalidInterviewLength("Invalid interview length")

def start_interview(request):
    return HttpResponse("HEllo")

    try:
        if request.method == 'GET':
            keywords = request.GET.get('keywords')
            difficulty = request.GET.get('difficulty')
            interview_length = request.GET.get('interview_length')

            if(keywords.length == 0):
                return HttpResponse("Invalid Input", status=404)

        else:
            return HttpResponse("Bad request type", status=400)
        
        if(keywords.length == 0):
            question_count = get_question_count(interview_length, difficulty)
        
        

    # Exceptions

    except ObjectDoesNotExist:
        return HttpResponse("Object does not exist.", status=404)
    
    except InvalidInterviewLength:
        error_message = f"An error occurred: {str(e)}"
        return HttpResponse(error_message, status=404)
    
    except Exception as e:
        error_message = f"An error occurred: {str(e)}"
        return HttpResponse(error_message, status=500)